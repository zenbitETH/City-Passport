// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.11;

import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721URIStorageUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

import "./lib/Base64.sol";

/// @notice Contract is deliberately lacking withdraw, that will be added in the later version
/// The plan is to spend that money on something that the DAO decides
contract CityPassport is ERC721URIStorageUpgradeable, UUPSUpgradeable, OwnableUpgradeable {

    uint public constant MINT_PRICE = 0.01 ether;

    using CountersUpgradeable for CountersUpgradeable.Counter;
    CountersUpgradeable.Counter private _tokenIds;

    uint public version;

    function initialize(string memory _tokenName, string memory _symbol, uint _version) public initializer {
        __ERC721_init(_tokenName, _symbol);
        __Ownable_init();
        version = _version;
    }

    /// @notice Function used to ming token. Sender needs to pay MINT_PRICE + gas
    /// @param _to receiver of nft
    function mint(address _to) public payable {
        require(msg.value == MINT_PRICE, "Invalid amount");
        _tokenIds.increment();
        uint256 id = _tokenIds.current();
        _safeMint(_to, id);
    }

    function tokenURI(uint tokenId) override(ERC721URIStorageUpgradeable) public view returns (string memory) {
        string memory json = Base64.encode(
            bytes(string(
                abi.encodePacked(
                    '{',
                    '"image_data": "', _generateSvg(tokenId), '"',
                    '}'
                )
            ))
        );
        return string(abi.encodePacked('data:application/json;base64,', json));
    }

    function _uint2str(uint _i) internal pure returns (string memory _uintAsString) {
        if (_i == 0) {
            return "0";
        }
        uint j = _i;
        uint len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint k = len;
        while (_i != 0) {
            k = k-1;
            uint8 temp = (48 + uint8(_i - _i / 10 * 10));
            bytes1 b1 = bytes1(temp);
            bstr[k] = b1;
            _i /= 10;
        }
        return string(bstr);
    }

    function _generateSvg(uint tokenId) private view returns (string memory) {
        string memory encoded = Base64.encode(
            bytes(string(
                abi.encodePacked(
                    "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='350' height='350'>",
                    "<style>.heavy { font: bold 21px sans-serif; }</style>",
                    "<rect x='0' y='0' width='350' height='350' stroke='#FFC338' stroke-width='0px' fill='white'/>",
                    "<text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' class='heavy'>",
                    "CityPassport #",
                    _uint2str(tokenId),
                    " of ",
                    _uint2str(_tokenIds.current()),
                    "</text></svg>"
                )
            ))
        );

        return string(abi.encodePacked("data:image/svg+xml;base64,", encoded));
    }

    function _authorizeUpgrade(address) internal override onlyOwner {}
}

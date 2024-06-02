# Alt-BN128

This code implements serialization and deserialization functions for a set of structs that wrap types defined in the `bn` module. The purpose of the `Wrap*` structs is to provide an implementation of the `BorshSerialize` and `BorshDeserialize` traits from the borsh crate, which enables serialization and deserialization of the corresponding types to and from binary data.

The bn module provides types for a Barreto-Naehrig elliptic curve with 128-bit security, also known as `alt_bn128`. Specifically, the `WrapU256`, `WrapFr`, `WrapFq`, `WrapFq2`, `WrapG1`, and `WrapG2` structs wrap `U256`, `Fr`, `Fq`, `Fq2`, `G1`, and `G2` types, respectively. The `U256` type is a 256-bit unsigned integer, and the `Fr`, `Fq`, and `Fq2` types are elements of the field used in the elliptic curve. The `G1` and `G2` types are points on the curve, where `G1` is the group of points over the base field and `G2` is the group of points over a quadratic extension of the base field.

The serialization and deserialization functions use the serialize and deserialize methods of the `BorshSerialize` and `BorshDeserialize` traits, respectively, to write and read the binary data for each wrapped type. For the `WrapFr` and `WrapFq` types, an additional check is performed to ensure that the deserialized value is less than the modulus of the field, which is required for the value to be a valid element of the field. For the `WrapG1` and `WrapG2` types, the serialization and deserialization functions convert the points to and from the affine representation, which is a more compact representation that only stores the `x` and `y` coordinates of the points. The `AffineG1` and `AffineG2` types provide the conversion functions for the `G1` and `G2` points, respectively.

## Source code

* [alt_bn128.rs](https://github.com/zeropoolnetwork/zeropool-substrate/blob/main/pallets/pallet-zeropool/src/alt_bn128.rs)
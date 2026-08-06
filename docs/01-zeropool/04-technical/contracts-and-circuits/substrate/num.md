# U256

This module provides a `U256` type that represents an unsigned 256-bit integer. It uses the construct_uint macro from the `ff_uint`. Additionally, the module provides a conversion implementation from `sp_core::U256` to `U256`, and vice versa.

The module defines a `from_const_str` method that constructs a `U256` from a string of decimal digits. The string is passed as a byte slice, and the method will panic if any byte in the slice is not a digit.

## Source code

* [num.rs](https://github.com/zeropoolnetwork/zeropool-substrate/blob/main/pallets/pallet-zeropool/src/num.rs)
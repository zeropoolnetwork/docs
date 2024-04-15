# Operator

There is a `OperatorManager` trait and a simple implementation of it in the form of a Substrate pallet called `Operator`. The `OperatorManager` trait defines two methods: `is_operator` and `set_owner`. The `Operator` pallet implements these methods to keep track of an account that is designated as an operator and allow for ownership changes.

The `Operator` pallet has a configuration trait `Config` that extends `frame_system::Config`. It defines an event type `Event` and a constant type `InitialOwner` which specifies the initial owner of the pallet.

The `Operator` pallet has two storage items: `Operator` and `Owner`. `Operator` stores the account `ID` of the designated operator and `Owner` stores the account `ID` of the current owner.

The `Operator` pallet defines a `check_owner` function to verify that the origin (i.e., the sender) of a transaction is the current owner of the pallet. It also defines a `set_operator` function that allows the owner to set the designated operator account. The `set_operator` function modifies the `Operator` storage item and emits an `OperatorChanged` event.

Finally, the `Operator` pallet implements the `OperatorManager` trait to provide implementations for the `is_operator` and `set_owner` methods. The `is_operator` method returns whether a given account is the designated operator account. The `set_owner` method allows for the owner of the pallet to change. This method modifies the `Owner` storage item and emits an `OwnerChanged` event.

## Source code

* [operator.rs](https://github.com/zeropoolnetwork/zeropool-substrate/blob/main/pallets/pallet-zeropool/src/operator.rs)
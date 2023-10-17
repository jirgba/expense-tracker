import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ExpenseTrackerApp = () => {
  const [details, setDetails] = useState({
    expense: "",
    amount: null,
  });
  const [expensesList, setExpensesList] = useState([]);

  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = async () => {
    try {
      const storedExpenses = await AsyncStorage.getItem("@expenses");
      if (storedExpenses !== null) {
        setExpensesList(JSON.parse(storedExpenses));
      }
    } catch (error) {
      console.error("Error loading expenses:", error);
    }
  };

  const saveExpenses = async () => {
    try {
      await AsyncStorage.setItem("@expenses", JSON.stringify(expensesList));
    } catch (error) {
      console.error("Error saving expenses:", error);
    }
  };

  const addExpense = () => {
    if (expense.trim() === "") {
      return;
    }

    const newExpense = {
      id: Math.random().toString(),
      value: expense,
    };

    setExpensesList((prevExpensesList) => [...prevExpensesList, newExpense]);
    setExpense("");
  };

  const deleteExpense = (expenseId) => {
    setExpensesList((prevExpensesList) =>
      prevExpensesList.filter((expense) => expense.id !== expenseId)
    );
  };

  useEffect(() => {
    saveExpenses();
  }, [expensesList]);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={(expense) => setDetails(...details, expense: expense)}
          value={details.expense}
          placeholder="Enter an expense"
        />
        <TextInput
          style={styles.input}
          onChangeText={(amount) => setDetails(...details, amount)}
          value={details.amount}
          placeholder="Enter an expense"
        />
        <Button onPress={addExpense} title="Add" />
      </View>

      <FlatList
        data={expensesList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.expenseItem}>
            <Text style={styles.expenseText}>{item.value}</Text>
            <Button
              onPress={() => deleteExpense(item.id)}
              title="Delete"
              color="red"
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  input: {
    width: "80%",
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    padding: 5,
  },
  expenseItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  expenseText: {
    fontSize: 18,
    width: 240,
  },
});

export default ExpenseTrackerApp;

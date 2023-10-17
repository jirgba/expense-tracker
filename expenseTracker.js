import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  Pressable,
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

  useEffect(() => {
    saveExpenses();
  }, [expensesList]);

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
    
    if (details.expense.trim() === "") {
      return;
    }

    // Get the current date and time
    const currentDate = new Date();

    // Define the format for displaying the date and time
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    };

    // Format the date and time
    const formattedDateTime = currentDate.toLocaleString(undefined, options);

    const newExpense = {
      id: Math.random().toString(),
      expense: details.expense,
      amount: details.amount,
      dateTime: formattedDateTime,
    };

    setExpensesList((prevExpensesList) => [...prevExpensesList, newExpense]);
    setDetails({
      expense: "",
      amount: null,
    });
  };

  const deleteExpense = (expenseId) => {
    setExpensesList((prevExpensesList) =>
      prevExpensesList.filter((expense) => expense.id !== expenseId)
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={(expense) =>
            setDetails({ ...details, expense: expense })
          }
          value={details.expense}
          placeholder="Enter an expense"
        />
        <TextInput
          style={styles.input}
          onChangeText={(amount) => setDetails({ ...details, amount: amount })}
          value={details.amount}
          placeholder="Enter an expense"
        />
        <Pressable
          style={{ backgroundColor: "blue", padding: 10, borderRadius: 6 }}
          onPress={() => addExpense()}
        >
          <Text style={{ color: "white", fontSize: 15, fontWeight: 500 }}>
            Add Transaction
          </Text>
        </Pressable>
      </View>

      <FlatList
        data={expensesList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.expenseItem}>
            <Text style={styles.expenseText}>Expense: {item.expense}</Text>
            <Text style={styles.expenseText}>Amount: {item.amount}</Text>
            <Text style={styles.expenseText}>Date & Time: {item.dateTime}</Text>
            <Pressable
              style={{ backgroundColor: "red", padding: 10, borderRadius: 6 }}
              onPress={() => deleteExpense(item.id)}
            >
              <Text style={{ color: "white", fontSize: 15, fontWeight: 500 }}>
                Delete
              </Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  inputContainer: {
    gap: 20,
    marginBottom: 10,
  },
  input: {
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    padding: 5,
    fontSize: 15,
    marginTop: 10,
  },
  expenseItem: {
    gap: 10,
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

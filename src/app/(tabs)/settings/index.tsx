
import { useState } from "react";
import { View, Text, Button } from "react-native";

const API_URL = "http://192.168.0.219:8000";
export default function HomeScreen() {
  const [message, setMessage] = useState("Press the button to test");

  async function testAPI() {
    try {
      const response = await fetch(`${API_URL}/hello`);
      console.log(`${API_URL}/hello`)

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Request failed"
      );
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 24 }}>
      <Text style={{ marginBottom: 20 }}>{message}</Text>
      <Button title="Test FastAPI" onPress={testAPI} />
    </View> 
  );
}

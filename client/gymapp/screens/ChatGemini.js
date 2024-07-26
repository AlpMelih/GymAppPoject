import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import {
  ApplicationProvider,
  Input,
  Button,
  Text,
  Spinner,
} from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import axios from "axios";

export default function ChatGemini() {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState("");

  // Replace with actual Gemini AI API endpoint
  const API_URL = "https://your-gemini-ai-endpoint.com";

  const handleQuestionSubmit = async () => {
    if (!question) return;

    setLoading(true);
    setAnswer("");

    try {
      const response = await axios.post(
        "AIzaSyA2q1JDCLpbgKSBbJ9F0VcBHr2EKB3xe3w",
        {
          // Update with Gemini AI specific request body format
          question: question,
          // Additional information specific to Gemini AI API (optional)
        }
      );
      // Update based on Gemini AI response format (likely under "answer" key)
      setAnswer(response.data.answer);
    } catch (error) {
      console.error(error);
      setAnswer("Bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
      setQuestion("");
    }
  };

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <View style={styles.container}>
        <Text category="h1">Gemini AI ile Soru Sor</Text>
        <Input
          value={question}
          placeholder="Sormak istediğiniz soruyu yazın"
          onChangeText={setQuestion}
          style={styles.input}
        />
        <Button onPress={handleQuestionSubmit}>Soru Sor</Button>
        {loading && <Spinner style={styles.spinner} />}
        {answer ? <Text style={styles.answer}>{answer}</Text> : null}
      </View>
    </ApplicationProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  input: {
    marginVertical: 20,
  },
  spinner: {
    marginVertical: 20,
  },
  answer: {
    marginTop: 20,
    fontSize: 16,
  },
});

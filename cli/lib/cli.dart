// import 'package:flutter/foundation.dart';
import 'package:http/http.dart' as http;

void createUser() async {
  Map req = new Map();
  req = {
    "firstName": "Tina", // primary key
    "lastName": "Quang",
    "email": "tinaquang@gmail.com",
    "ageTest": "21",
    "password": "12345678",
  };
  var baseUrl = Uri.parse("http://localhost:3000/api/createUser");
  var response = await http.post(baseUrl, body: req);

  print(response.body);
}

void createReceipt() async {
  Map req = new Map();
  const receiptData = {
    "location": "Boston Pizza", // primary key
    "when": "February,20,2023",
    "subTotal": "20.02",
    "tax": "3.23",
    "tip": "2.84",
  };
  var baseUrl = Uri.parse("http://localhost:3000/api/createReceipt");
  var response = await http.post(baseUrl, body: req);

  print(response.body);
}

void main() async {
  createUser();
  createReceipt();
}

// import 'package:flutter/foundation.dart';
import 'package:http/http.dart' as http;

void createUser() async {
  Map req = new Map();
  req = {
    "firstName": "con", // primary key
    "lastName": "bed",
    "email": "conbed@gmail.com",
    "ageTest": "21",
    "password": "12345678",
  };
  var baseUrl = Uri.parse("http://localhost:3000/api/createUser");
  var response = await http.post(baseUrl, body: req);

  print(response.body);
}

void createReceipt() async {
  Map req = new Map();
  req = {
    "location": "Costco", // primary key
    "when": "February,20,2023",
    "subTotal": "20.02",
    "tax": "3.23",
    "tip": "2.84",
  };
  var baseUrl = Uri.parse("http://localhost:3000/api/createReceipt");
  var response = await http.post(baseUrl, body: req);

  print(response.body);
}

void createFriendship() async {
  Map req = new Map();
  req = {
    "friend1": "kevindang@gmail.com", // primary key
    "friend2": "veronica@gmail.com",
  };
  var baseUrl = Uri.parse("http://localhost:3000/api/createFriendship");
  var response = await http.post(baseUrl, body: req);

  print(response.body);
}

// Function for adding receipt.
Future<void> sendRequestWithFile() async {
  var request = http.MultipartRequest(
      'POST', Uri.parse('http://localhost:3000/api/createUser'));

  // Add the file to the request
  // UNCOMMENT THIS WHEN TESTING
  var file = await http.MultipartFile.fromPath('image', "/Users/jeffreywong/Desktop/Bill-Wizard-Backend/assets/images/gitpp.png");
  request.files.add(file);

  // Add additional fields
  request.fields['firstName'] = "Connor";
  request.fields['lastName'] = "Bedard";
  request.fields['email'] = "cbcbcb@gmail.com";
  request.fields['ageTest'] = "17";
  request.fields['password'] = "dwjadlj291f";
  // request.fields['image'] = imgPath;

  // Send the request
  var response = await request.send();

  // Handle the response
  if (response.statusCode == 200) {
    print('Request successful');
  } else {
    print('Request failed with status code: ${response.statusCode}');
  }
}

void loadReceiptContent() async {
  Map req = new Map();
  req = {
    "firstName": "veronica", // primary key
    "lastName": "smith",
    "email": "veronica@gmail.com",
    "ageTest": "21",
    "password": "12345678",
  };
  var baseUrl = Uri.parse("http://localhost:3000/api/loadReceiptContent");
  var response = await http.post(baseUrl, body: req);

  print(response.body);
}

void loadFriendshipContent() async {
  Map req = new Map();
  req = {
    "firstName": "veronica", // primary key
    "lastName": "smith",
    "email": "veronica@gmail.com",
    "ageTest": "21",
    "password": "12345678",
  };
  var baseUrl = Uri.parse("http://localhost:3000/api/loadFriendshipContent");
  var response = await http.post(baseUrl, body: req);

  print(response.body);
}

void main() async {
  createUser();
  // createReceipt();
  // createFriendship();
  // sendRequestWithFile();
  // loadReceiptContent();
  //loadFriendshipContent();
}

// import 'package:flutter/foundation.dart';
import 'package:http/http.dart' as http;

void createUser() async {
  Map req = new Map();
  req = {
    "firstName": "HEHE", // primary key
    "lastName": "XD",
    "email": "haha@gmail.com",
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

// Function for adding receipt.
Future<void> sendRequestWithFile() async {
  var request = http.MultipartRequest(
      'POST', Uri.parse('http://localhost:3000/api/createReceipt'));

  // Add the file to the request
  // UNCOMMENT THIS WHEN TESTING
  // var file = await http.MultipartFile.fromPath('image', );
  // request.files.add(file);

  // Add additional fields
  request.fields['location'] = "Boston Pizza";
  request.fields['when'] = "March 20 1993";
  request.fields['subTotal'] = "22.21";
  request.fields['tax'] = "2.32";
  request.fields['tip'] = "1.23";
  request.fields['payerEmail'] = "kevindang@gmail.com";
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

void main() async {
  createUser();
  createReceipt();
  sendRequestWithFile();
}

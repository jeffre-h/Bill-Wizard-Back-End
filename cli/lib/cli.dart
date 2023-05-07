// import 'package:flutter/foundation.dart';
import 'package:http/http.dart' as http;

void main() async {
  Map req = new Map();
  req = {
    "user_name": "ron", // primary key
    "name": "ronney",
    "amount_owed": "100"
  };
  var baseUrl = Uri.parse("http://localhost:3000/api/create_user");
  var response = await http.post(baseUrl, body: req);

  print(response.body);

  // console.log("testing ...");
  // static createUser(Map udata) async {
  //     print(udata);
  //     var url = Uri.parse("${baseUrl}create_user");

  //     try {
  //         final res = await http.post(url, body: udata);

  //         if (res.statusCode == 200) {
  //             var data = jsonDecode(res.body.toString());
  //             print(data);
  //         } else {
  //             print("failed to get response");
  //         }
  //     } catch (e) {
  //         debugPrint(e.toString());
  //     }
  // }
}

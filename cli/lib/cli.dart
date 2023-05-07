// import 'package:flutter/foundation.dart';
import 'package:http/http.dart' as http;

void main() async {
  var baseUrl = Uri.parse("http://localhost:3000/api/");
  var response = await http.get(baseUrl);

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

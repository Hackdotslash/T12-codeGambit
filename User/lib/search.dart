import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;


class SearchScreen extends StatefulWidget {
  @override
  _SearchScreenState createState() => _SearchScreenState();
}

class _SearchScreenState extends State<SearchScreen> {
  @override

  void getData() async {
    http.Response response = await http.get(
      'https://api.covid19india.org/state_district_wise.json'
    );
    if (response.statusCode == 200) {
      String data = response.body;
      var decodedData  = jsonDecode(data);
      print(decodedData["Gujarat"]["districtData"]["Surat"]["active"]);
    }

  }

  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: RaisedButton(
          onPressed: () {
            getData();
          },
          child: Text('Get Data'),
        ),
      ),
    );
  }
}
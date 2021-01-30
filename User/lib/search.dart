import 'dart:convert';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class SearchScreen extends StatefulWidget {
  @override
  _SearchScreenState createState() => _SearchScreenState();
}

class _SearchScreenState extends State<SearchScreen> {
  String _city, _state;
  final _formKey = GlobalKey<FormState>();
  @override
  void getData() async {
    http.Response response =
        await http.get('https://api.covid19india.org/state_district_wise.json');
    if (response.statusCode == 200) {
      String data = response.body;
      var decodedData = jsonDecode(data);
      print(decodedData["Gujarat"]['districtData']);
    }
  }

  Widget build(BuildContext context) {
    return new WillPopScope(
      onWillPop: () async => false,
      child: Scaffold(
        appBar: AppBar(
          title: Text('BonVoyage'),
          automaticallyImplyLeading: false,
        ),
        body: Form(
          key: _formKey,
          child: Padding(
            padding: const EdgeInsets.all(10.0),
            child: Column(
              children: <Widget>[
                TextFormField(
                  decoration: InputDecoration(
                    hintText: 'Enter state',
                    border: OutlineInputBorder(),
                    filled: true,
                  ),
                  onChanged: (value) {
                    _state = value;
                  },
                  validator: (value) {
                    if (value.isEmpty) {
                      return 'Please enter state name';
                    }
                    return null;
                  },
                ),
                TextFormField(
                  decoration: InputDecoration(
                    hintText: 'Enter city',
                    border: OutlineInputBorder(),
                    filled: true,
                  ),
                  onChanged: (value) {
                    _state = value;
                  },
                  validator: (value) {
                    if (value.isEmpty) {
                      return 'Please enter a city name';
                    }
                    return null;
                  },
                ),
                Padding(
                  padding: const EdgeInsets.all(10.0),
                  child: FlatButton(
                    onPressed: () {
                      getData();
                    },
                    child: Text('Search'),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

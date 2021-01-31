import 'dart:collection';
import 'dart:convert';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class SearchScreen extends StatefulWidget {
  @override
  _SearchScreenState createState() => _SearchScreenState();
}

class _SearchScreenState extends State<SearchScreen> {
  List hotelList;
  String _city, _state;
  String cityName = '';
  final _formKey = GlobalKey<FormState>();

  void getHotels(String cityName) async {
    QuerySnapshot hotels =
        await FirebaseFirestore.instance.collection('hotels').get();

    setState(() {
      if (cityName == '') {
        hotelList = hotels.docs;
      } else{
        hotelList = hotels.docs.where((element) => element['city'] == cityName).toList();
      }
    });
  }

  @override
  void getData(String city, String state) async {
    http.Response response =
        await http.get('https://api.covid19india.org/state_district_wise.json');
    if (response.statusCode == 200) {
      String data = response.body;
      var decodedData = jsonDecode(data);
      print(decodedData[state]['districtData'][city]['active']);
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
                    _city = value;
                    cityName = value;
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
                      getData(_city, _state);
                      getHotels(cityName);
                    },
                    child: Text('Search'),
                    color: Colors.red,
                  ),
                ),
                hotelList == null
                    ? Text('No results')
                    : ListView.builder(
                        scrollDirection: Axis.vertical,
                        shrinkWrap: true,
                        itemCount: hotelList.length,
                        itemBuilder: (context, index) {
                          return Card(
                            child: ListTile(
                              title: Text(hotelList[index]['name']),
                            ),
                          );
                        },
                      ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

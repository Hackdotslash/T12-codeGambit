import 'dart:collection';
import 'dart:convert';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:user_app/main.dart';
import 'package:user_app/screens/authenticate/welcome.dart';
import 'package:user_app/screens/booking/rooms.dart';

class SearchScreen extends StatefulWidget {
  @override
  _SearchScreenState createState() => _SearchScreenState();
}

class _SearchScreenState extends State<SearchScreen> {
  List hotelList;
  String _city, _state = '';
  String cityName = '';
  List temp = [];
  final _formKey = GlobalKey<FormState>();
  int active;

  Future<void> _signOut() async {
    try {
      await FirebaseAuth.instance.signOut();
      Navigator.of(context).push(MaterialPageRoute(builder: (context) => MyApp()));
    } catch (e) {
      print(e.message);
    }
  }

  void initState() {
    getInit();
    super.initState();
  }

  void getInit() async {
    QuerySnapshot hotels =
        await FirebaseFirestore.instance.collection('hotels').get();
    setState(() {
      hotelList = hotels.docs;
    });
  }

  void getHotels(String cityName) async {
    QuerySnapshot hotels =
        await FirebaseFirestore.instance.collection('hotels').get();

    if (cityName == '') {
      setState(() {
        hotelList = hotels.docs;
      });
    } else {
      QuerySnapshot hotels = await FirebaseFirestore.instance
          .collection('hotels')
          .where('city', isEqualTo: cityName)
          .get();
      setState(() {
        hotelList = hotels.docs;
      });
    }
  }

  @override
  void getData(String city, String state) async {
    http.Response response =
        await http.get('https://api.covid19india.org/state_district_wise.json');
    if (response.statusCode == 200) {
      String data = response.body;
      var decodedData = jsonDecode(data);
      setState(() {
        active = decodedData[state]['districtData'][city]['active'];
      });
    }
  }

  Widget build(BuildContext context) {
    return new WillPopScope(
      onWillPop: () async => false,
      child: Scaffold(
        appBar: AppBar(
          title: Text('BonVoyage'),
          automaticallyImplyLeading: false,
          actions: <Widget>[
            Padding(
              padding: EdgeInsets.all(0),
              child: FlatButton(
                onPressed: () {
                  _signOut();
                },
                child: Text('LOGOUT'),
              ),
            ),
          ],
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
                SizedBox(
                  height: 5.0,
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
                _city == null
                    ? SizedBox(height: 0)
                    : Card(
                        child: ListTile(
                          title: Text(
                            'Active Cases: ' + active.toString(),
                            style: TextStyle(
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          trailing: Text(_city),
                        ),
                      ),
                SizedBox(
                  height: 5.0,
                ),
                Text(
                  'Hotels',
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                  ),
                ),
                SizedBox(
                  height: 5.0,
                ),
                hotelList == null
                    ? SizedBox(height: 0)
                    : Expanded(
                        child: ListView.builder(
                          scrollDirection: Axis.vertical,
                          shrinkWrap: true,
                          itemCount: hotelList.length,
                          itemBuilder: (context, index) {
                            return FlatButton(
                              onPressed: () {
                                Navigator.of(context).push(MaterialPageRoute(builder: (context) => RoomScreen(id: hotelList[index])));
                              },
                              child: Card(
                                child: ListTile(
                                  title: Text(hotelList[index]['name']),
                                ),
                              ),
                            );
                          },
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

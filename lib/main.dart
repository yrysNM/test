import 'package:flutter/material.dart';
import 'package:hello_world/pages/first_page.dart';
import 'package:hello_world/pages/second_page.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  static const List names = ['Test1', "test,2", 'test,3'];

  void userTapped() {
    print('hello world@@@@');
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: FirstPage(),
      routes: {"/secondpage": (context) => SecondPage()},
    );
  }
}

// class MyApp extends StatelessWidget {
//   MyApp({super.key});

//   // variables
//   String name = 'Hello WORLD';
//   int age = 23;
//   double pi = 3.14;
//   bool isTrue = true;

//   // function
//   void greet() {
//     print("Hello TEST");
//   }

//   void greetPet(String name) {
//     print("Hello " + name);
//   }

//   @override
//   Widget build(BuildContext context) {
//     // loops
//     // for (int i = 3; i <= 5; i++) {
//     // print(i);
//     // }

//     // greet();
//     // greetPet("EFWFWEF");
//     return const MaterialApp(
//       home: Scaffold(),
//       debugShowCheckedModeBanner: false,
//     );
//   }
// }

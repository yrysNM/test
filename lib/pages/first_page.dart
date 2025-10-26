import "package:flutter/material.dart";
import "package:hello_world/pages/second_page.dart";

class FirstPage extends StatelessWidget {
  const FirstPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('First page')),
      body: Center(
        child: ElevatedButton(
          onPressed: () {
            // navigate to second page

            // set uped routes second variant of navigate
            Navigator.pushNamed(context, "/secondpage");

            // without routes config first variant
            // Navigator.push(
            //   context,
            //   MaterialPageRoute(builder: (context) => SecondPage()),
            // );
          },
          child: Text("Go to second page"),
        ),
      ),
    );
  }
}

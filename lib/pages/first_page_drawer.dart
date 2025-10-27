import "package:flutter/material.dart";

class FirstPage extends StatelessWidget {
  const FirstPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('First page')),
      drawer: Drawer(
        backgroundColor: Colors.deepPurple[100],
        child: Column(
          children: [
            DrawerHeader(
              child: Icon(Icons.favorite, color: Colors.white, size: 48),
            ),

            ListTile(
              leading: Icon(Icons.home),
              title: Text("H O M E"),
              onTap: () {
                // pop drawer first
                Navigator.pop(context);

                // go to home page
                Navigator.pushNamed(context, '/homepage');
              },
            ),

            ListTile(
              leading: Icon(Icons.settings),
              title: Text("S E T T I N G S"),
              onTap: () {
                // go to settings page
                Navigator.pushNamed(context, "/settingspage");
              },
            ),
          ],
        ),
      ),
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

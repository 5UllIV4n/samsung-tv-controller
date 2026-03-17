# samsung-tv-controller (BETA)

Prerequisites

Before running the script, ensure you have the following:

    Node.js installed on your computer.

    A Samsung Smart TV (typically 2016 or newer) connected to the same local network as your computer.

    The IP Address and MAC Address of your TV. (Found in Settings > General > Network > Network Status).

Setup & Installation
1. Initialize the Project

   Create a new folder for your project, open your terminal there, and run:
   Bash
        
       npm init -y
       npm install samsung-tv-control

2. Configure the Script

Paste your code into the file you made (example remote.js.) You must update the config object with your TV's specific details:
JavaScript

    const config = {
      ip: '192.168.1.50',        // Replace with your TV's IP
      mac: '00:00:00:00:00:00',  // Replace with your TV's MAC
      name: 'NodeRemote',
      token: savedToken
    };

How it Works

The script operates in three main phases:
Phase 1: Authentication (The "Handshake")

The first time you run this, your TV will show a popup asking for permission.

The tv.getToken() function listens for that pairing.

Once you click "Allow" on your TV screen, the script saves a unique string (a token) to tv-token.txt.

Future runs will use this file so you don't have to "Allow" access every time.

Phase 2: Key Mapping

The keys object maps your physical keyboard letters to Samsung-specific commands:

    W/A/S/D: Navigation (Up, Left, Down, Right)

    E: Enter / Select

    Q: Return / Back

    + / -: Volume Control

Phase 3: Input Listening

The script uses process.stdin.setRawMode(true). This tells Node.js to listen to every single keystroke immediately without waiting for you to press "Enter."
🎮 Keyboard Controls

Once the script is running, use these keys to control your TV:
Key	Action

    W, A, S, D	-Move Highlight
    E	          -Select (Enter)
    Q	          -Go Back
    H	          -Home Menu
    = / -	      -Volume Up / Down
    Y	          -Open YouTube
    N	          -Open Netflix
    CTRL + C	  -Close the Remote


💡 Troubleshooting Tips

TV Not Found: Ensure your TV is turned ON and connected to the same Wi-Fi/Ethernet as your laptop.

Connection Refused: Some newer TVs require you to go into Settings > General > External Device Manager > Device Connect Manager and ensure "Access Notification" is set to "First Time Only."

App IDs: The numbers in tv.openApp('111299001912') are specific to the Samsung App Store. If YouTube doesn't open, your region might use a different ID.


# WARNNING: this is still a beta and I'm still working on it, twin.


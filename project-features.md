Fault Line Project

**System Design**

This is what I want to create. I want to create a desktop environment UI similar to linux mint using React, and Tailwind. The Environment will be called Penguin OS, and inside the OS, the fault line project will be presented through three user desktop environments.
When app is launched, it should have a full-screen option(to escape browser UI). It should show the sign in options for username and password. There will be 3 users, Joseph, Titus, and Naomi. Depending on the user, the desktop environment will show different icons. However, the shared icons like MyPC, Start menu, taskbar icons, at the bottom etc, will be shared across users.
**Shared UI
**The following UIs will be shared across users:

*   Taskbar icons like clock, wifi, battery, Start Menu, and search icons
*   Desktop icons will include File Explorer, My PC, Trash, Settings, and Terminal.
*   File explorer will open to the file system UI, which will contain:
    \-The top bar with back & forward icons, an address bar, and a “+ New” for creating new folders/files.

\-a side panel with two sections both in column view. First section should have Home icon(highlighted-default explorer path), Downloads, Documents, Pictures, Music, and Video icons and names. The second section should have “My PC” and “Network” icons and names. My PC should be expandable to show the drives.

\-The main panel should show two sections(Quick access and Recent) in accordion nature. The Quick access should have the icons and details in the first section of the side panel in tile view. The recent section should show recent open files.

*   My PC will also open to file explorer, but in the My PC section will open the My PC path as default path, which has the drives C, D, and any other user UI dedicated Drive.
*   The terminal should open a UI similar to Linux terminal panel. It should be a text based command line where the user can enter commands and hit enter, which should simulate something. The terminal should be consistent with the desktop UI. Commands and what they simulate will be discussed in Naomi’s section.

**
Dedicated User UI**

1.  _Joseph, Benjamin’s father._

There will be an icon(can use a placeholder icon till I find a good one) that allows him to open the encryption tool to encrypt the usb. The encryption tool can have similar interface to encryption tools: It should have:

\- an encryption target section showing a list of the drives(divided by internal and external) including C, D, then A:archive\_ and B:USB\_key(showing the usb drives). Should highlight selected drive(when user taps on drive). 

\-a button for encrypt and another for decrypt. It should also have another droplist section for choosing KEK drive... should only show B(USB\_key) on the list as it is the only other free usb drive inserted When user presses encrypt, it should prompt for a password(John 8:32-typing it in should be hidden) simulate the encryption with a section showing the status logs with a % progress bar at the bottom... The following are the logs with their delay times:

Encryption Type:

 \[x\] Split Key Encryption

\[Start Encryption\](1 sec delay)

\---------------------------------------

Status:

Generating Data Encryption Key...(2 sec delay)

Storing Key to KEK Drive...(2 sec delay)

Encrypting Drives...(20 sec delay)

Progress ███████░░ 70%

\[ The last status should be encryption complete(100%) and have a button for done active(different color to show it's active- greyed out before) the progress bar should move based on the time allocated to the encryption above\]...

2\. When Titus logs in as the user. There should be a file explorer icon on the desktop, when opened it should show the file explorer window with the drives C, D, and A: archive\_(the inserted usb drive).

\-When the drive, A, is clicked, it should open a modal saying the drive is encrypted and asking for a password. The only acceptable password is "John 8:32" and all other passwords should show an alert below the password input field in a danger color, "wrong password! {count} attempts left", where count starts at 5 and reduces by one until all attempts are made.

\- When the user enters the correct password and clicks enter, it should load for a second, then Folders  should auto open on the screen one after another. All of them with different names and different file types. Should limit folders to 8. The Folders should have files in list view with different icons based on file type.

\-When the correct password is entered and the user accesses the drive, the pop up modal should disappear, and the file explorer show the drives contents(A folder named ''FAULT LINES"). clicking the folder should show a list of folders(icons) with random names(combination of keys) and files like hfgr0.bin. and another file folder named "hidden". When the hidden folder is clicked it should open to an empty folder.

\- as the file explorer is skimmed through, there should be an address bar that shows how deep in the folder the user is in... eg. A: archive\_/FAULt LINES/hidden/... there should also be 2 arrows(left and right for navigation backwards and forwards).

\- There should be another icon named Drive\_2. This icon should house the UI for the second drive opened alone. Should be the same as the other drive, except the files and folders should be encrypted and their names end in “.encrypt”. For example, 0x001265f.encrypt. Clicking to open these folders should not work, just show a disappearing toast showing “access denied”.

3\. When user is Naomi, and she logs in, there should be extra icons on the desktop:

*   USB analyzer icon: When clicked, the icon should open the tool’s UI which will have the two sections. First, “General Properties” which will have the drive’s label and name, Used storage and free storage, full capacity below(storage in bytes and GB, so a 3 rows with 3 columns), Type: Removable, File system: ntfs. The second section at the bottom will have a button named “Analyze” and a text-field below it where analysis logs will show. When analyze is clicked, it should log the status of the analysis, such as ‘analysing drive… examining encryption hash… determining encryption type… success, key split encryption… KEK’ with delay between logs.
*   A ‘pi\_decrypt’ tool icon for the decryption software UI(should be a terminal interface when opened with symbol ‘$‘ before every user input line )... The following are the commands that should initiate the changes described:

\- $ lsblk : should list the external drives and sizes: A and B in this format where > is a node tree.

sda > sda1 64GB

sda > sda2 16GB

\-$ blkinfo /dev/sdb1: determining which drive is which should return:

label=”A” type=”vault\_archive”

\-$ blkinfo /dev/sdb2: determining drive 2, should return:
label=”B” type=”vault\_key”

\-$ pi\_decrypt open --keystore /dev/sdb2  : should  initialize the decryption with the following logs:

 \[ pi\_decrypt \] Loading keystore metadata...

\[ pi\_decrypt \] Parsing header...

\[ pi\_decrypt \] Decrypting keystore…

▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒(progress bar for the process). 

\[ pi\_decrypt \] enter keystore password(allow user to enter password: John 8:32 . If password is wrong, return ‘validation error’ else continue with the logs).

\[ pi\_decrypt \] password accepted…

\[ pi\_decrypt \] unwrapping DEK…

DEK: 7f9a2c1e88b4d0f3c1aa9e77d4e2f9c0 (user will copy the DEK for decryption).

\-$ pi\_decrypt unlock --device /dev/sda1 --dek 7f9a2c1e88b4d0f3c1aa9e77d4e2f9c0 : should start the decryption of drive A. The following logs should be seen with a delay of 10 seconds between each log:

  \[ pi\_decrypt \] Validating DEK...

 \[ pi\_decrypt \] Drive A authenticated.

 \[ pi\_decrypt \] Mounting decrypted volume…

\[ pi\_decrypt \] /mnt/vault/Faultline\_decrypted/

\[ pi\_decrypt \] open: Faultline\_decrypted/

*   When the decryption is done, several folders should automatically open on the desktop:
*   Insurance\_fraud\_docs : contain doc files like pdfs and docx icons with random names.
*    manipulation\_tapes/ : should have files with video icons. The names should be made of a string and numbers representing the timestamp.
*   Extortion\_evidence.mp4 : This should be a video player UI with a seek bar and a 1 minute timeline. The progress bar of the video should play automatically for the one minute as if video is playing, unless user clicks the pause icon.
*   The File explorer/My PC on this user should show the Drive(A) as already decrypted. Therefore, opening the drive should list the folders above and video file.
*   Whenever the video is played(the progress bar gets to the 1 min mark), a modal with Enter Password: and a text field should pop up: The password should be “WINNIEBRENDABENJAMIN” and a “ENTER” button. When user presses enter after correct password, another window should pop up showing:
*   Unlocking Drive…
*   Uploading to cloud…
*   Connecting accounts…
*   Uploading…
*   success!…

The design should be consistent across users.
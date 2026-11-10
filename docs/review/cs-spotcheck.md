# Spot check — cs

Generated 2026-11-10. ⚠ = a writer or blind reviewer had a doubt (scope or wording); the rest is a fixed random sample. Mark anything wrong or out of syllabus, with the id.

## cs-01 — Computer Basics and Architecture (10 of 90)

**cs-01-008** · CS-1.4 · E  
What is the hexadecimal digit that stands for the decimal value 10?  
**A) `A` ✓**  
B) `F`  
C) `B`  
D) `1`  
_Hexadecimal counts 0–9 and then A = 10, B = 11 up to F = 15. F is 15, and a digit "1" is simply one._

**cs-01-015** · CS-1.3 · E  
Which of these is a storage device?  
A) Webcam  
**B) Hard disk ✓**  
C) Joystick  
D) Monitor  
_A hard disk stores data permanently. A webcam and joystick are input devices and a monitor is an output device._

**cs-01-016** · CS-1.4 · M  
The decimal number 25 equals which binary number?  
**A) 11001 ✓**  
B) 10111  
C) 11011  
D) 10101  
_Divide by 2 repeatedly: 25 = 16 + 8 + 1, so the bits for 16, 8 and 1 are set, giving 11001. The binary 10111 is 23._

**cs-01-030** · CS-1.1 · M  
A touchscreen works as:  
A) An input device only, since it senses touch  
B) An output device only, since it shows images  
**C) Both an input and an output device ✓**  
D) A permanent storage device for user files  
_A touchscreen displays information (output) and senses touch (input). That is why it cannot be classed as only one._

**cs-01-036** · CS-1.1 · E  
Which of the following is a pointing device?  
A) Printer  
**B) Touchpad ✓**  
C) Speaker  
D) Monitor  
_A touchpad moves a cursor by finger movement, so it is an input pointing device. The others are output devices._

**⚠ cs-01-050** · CS-1.1 · M  
A disk defragmenter and an antivirus program are both examples of:  
A) Application packages for office work  
B) Language translators for programmers  
**C) Utility programs, a kind of system software ✓**  
D) Input devices attached to the computer  
_Utility programs maintain and protect the computer, and books class them as system software. They do not translate code and they are not office application packages._

**cs-01-053** · CS-1.1 · D  
At an ATM, a customer inserts a card, types a PIN, the machine checks the account balance and then gives out cash and a printed receipt. Which statement correctly labels two of these steps?  
A) Checking the balance is input; giving out cash is processing  
B) Inserting the card is output; typing the PIN is storage  
C) Printing the receipt is processing; checking the balance is output  
**D) Typing the PIN is input; printing the receipt is output ✓**  
_The PIN enters the machine, so it is input, and the receipt comes out to the user, so it is output. Checking the balance is processing, not input, which rules out the second statement._

**cs-01-059** · CS-1.2 · E  
Which register holds the address of the next instruction to be fetched?  
A) Instruction register (IR)  
B) Memory address register (MAR)  
**C) Program counter (PC) ✓**  
D) Accumulator (AC)  
_The program counter keeps the address of the next instruction. The IR holds the current instruction itself, not an address._

**⚠ cs-01-069** · CS-1.2 · D  
Which sequence correctly describes the fetch step of the instruction cycle?  
A) Instruction is copied to IR; PC's address is copied to MAR; the instruction is read into MDR; PC is increased  
**B) PC's address is copied to MAR; the instruction is read into MDR; MDR is copied to IR; PC is increased ✓**  
C) The instruction is read into MDR; MDR is copied to IR; PC's address is copied to MAR; PC is increased  
D) MDR is copied to MAR; PC's address is copied to IR; the instruction is read into MDR; PC is increased  
_Memory must first be given the address (PC to MAR), then the instruction arrives in the MDR, then it moves to the IR for decoding. Each other order reads or copies the instruction before memory has been given its address._

**cs-01-078** · CS-1.2 · D  
Each memory address holds one instruction. The instruction at address 300 is 'JUMP 450', which moves the program to address 450. After it has executed, what does the program counter hold?  
**A) 450 ✓**  
B) 301  
C) 300  
D) 451  
_A jump loads its target address into the PC, so the next fetch is from 450. The value 301 is what the PC held just after the fetch, before the jump was executed._

## cs-02 — Networks and Data Communication (10 of 100)

**cs-02-008** · CS-2.2 · M  
What is the function of the Domain Name System (DNS)?  
**A) It converts domain names into IP addresses ✓**  
B) It encrypts the data sent over web pages  
C) It assigns hardware addresses to network cards  
D) It blocks unwanted websites for the user  
_DNS works like a phone book that finds the IP address for a name such as example.com. It does not encrypt traffic, nor assign MAC addresses, nor act as a filter._

**cs-02-030** · CS-2.1 · M  
Which list puts the network types in order from the smallest area covered to the largest?  
A) MAN, LAN, WAN  
B) LAN, WAN, MAN  
**C) LAN, MAN, WAN ✓**  
D) WAN, MAN, LAN  
_A LAN covers a building or campus, a MAN covers a city and a WAN covers countries or the world. Putting MAN before LAN swaps the two smaller types._

**cs-02-047** · CS-2.2 · D  
At the sending computer, data moves down through the OSI layers. After it leaves the Presentation layer, which layer does it reach next?  
**A) Session layer ✓**  
B) Application layer  
C) Transport layer  
D) Network layer  
_Top to bottom the order is Application, Presentation, Session, Transport, Network, Data Link, Physical, so after Presentation comes Session. Application is above Presentation, so data has already passed through it._

**⚠ cs-02-051** · CS-2.2 · D  
For a live video call, a few lost packets matter less than avoiding delay. Which transport protocol is usually preferred for such real-time traffic, and why?  
A) TCP, because it resends every lost packet before going on  
B) UDP, because it guarantees every packet arrives in order  
C) TCP, because it needs no connection to be set up  
**D) UDP, because it sends without waiting to resend lost data ✓**  
_UDP is connectionless and does not wait for lost packets to be resent, so it adds little delay. TCP's retransmissions give reliability but cause delay, and it is TCP (not UDP) that sets up a connection and keeps order._

**cs-02-056** · CS-2.2 · D  
Which of these IPv4 addresses is in a private address range (not used directly on the Internet)?  
A) 11.15.3.2  
B) 172.32.1.1  
**C) 10.15.3.2 ✓**  
D) 192.169.1.1  
_The private ranges are 10.x.x.x, 172.16.x.x to 172.31.x.x and 192.168.x.x, so 10.15.3.2 is private. 172.32 is just past the 172.16-172.31 range and 192.169 is not 192.168._

**cs-02-058** · CS-2.2 · D  
A Class C network uses the mask 255.255.255.0, leaving 8 bits for hosts. How many addresses can be given to hosts?  
A) 256  
**B) 254 ✓**  
C) 255  
D) 253  
_8 host bits give 2^8 = 256 addresses, but the all-zeros address names the network and the all-ones address is the broadcast, leaving 256 - 2 = 254. 256 forgets those two reserved addresses._

**⚠ cs-02-063** · CS-2.3 · M  
Which device joins two segments of the same LAN and passes a frame to the other segment only if its destination MAC address is there?  
A) Repeater  
**B) Bridge ✓**  
C) Modem  
D) Hub  
_A bridge reads MAC addresses and filters traffic between two LAN segments. A repeater or hub passes every signal on without reading any address._

**⚠ cs-02-074** · CS-2.4 · M  
In which type of transmission is each character sent separately, framed by a start bit and a stop bit?  
**A) Asynchronous ✓**  
B) Synchronous  
C) Parallel  
D) Full-duplex  
_Asynchronous transmission marks each character with start and stop bits, so no shared clock is needed. Synchronous transmission sends blocks of data timed by a common clock._

**cs-02-078** · CS-2.4 · M  
In which modulation is the amplitude (strength) of the carrier wave changed according to the data, while its frequency stays the same?  
A) Frequency modulation (FM)  
B) Phase modulation (PM)  
C) Demodulation  
**D) Amplitude modulation (AM) ✓**  
_AM varies the height (amplitude) of the carrier to carry data. FM keeps the amplitude fixed and changes the frequency._

**⚠ cs-02-089** · CS-2.4 · D  
In asynchronous transmission, each 8-bit character is sent with 1 start bit and 1 stop bit. How many bits in total are sent for 100 characters?  
**A) 1000 ✓**  
B) 800  
C) 900  
D) 1200  
_Each character takes 8 + 1 + 1 = 10 bits, so 100 characters take 100 x 10 = 1000 bits. 800 counts only the data bits and forgets the start and stop bits._

## cs-03 — Security, Ethics and Law (10 of 60)

**cs-03-008** · CS-3.1 · M  
Which of the following passwords is the strongest?  
A) password123  
B) 12345678  
**C) Tr!7#kL9p2 ✓**  
D) ayesha  
_A strong password is long and mixes upper and lower case letters, digits and symbols that are not a dictionary word. The other choices are common and easy to guess._

**⚠ cs-03-015** · CS-3.1 · D  
In public-key (asymmetric) encryption, Bilal encrypts a message with Sara's public key. Which key can decrypt it?  
A) Sara's public key  
B) Bilal's public key  
C) Bilal's private key  
**D) Sara's private key ✓**  
_A message locked with someone's public key can be opened only with the matching private key, which only Sara holds. The public key is shared with everyone, so it cannot be what keeps the message secret._

**cs-03-016** · CS-3.1 · M  
A hidden program secretly records every key a user presses so that an attacker can capture passwords. It is called a:  
A) Firewall  
B) Compiler  
**C) Keylogger ✓**  
D) Device driver  
_A keylogger is spyware that records keystrokes and sends them to the attacker. A firewall is a protection tool that filters network traffic._

**⚠ cs-03-018** · CS-3.1 · D  
Which login method is two-factor authentication?  
A) A password plus a second, different password  
**B) A password plus a one-time code sent to the user's phone ✓**  
C) A password plus a four-digit PIN  
D) A user name plus a password  
_Two-factor authentication combines two different kinds of proof, such as something you know (password) and something you have (phone). A second password or a PIN is just another thing you know, so it is still one factor._

**cs-03-032** · CS-3.2 · M  
Someone uses another person's name, CNIC number and photos to open accounts and pretend to be that person online. This is:  
A) Software piracy  
B) Plagiarism  
**C) Identity theft ✓**  
D) Spamming  
_Identity theft is stealing personal details to impersonate someone, often for fraud. Software piracy is illegal copying of software, which is not involved here._

**⚠ cs-03-038** · CS-3.2 · D  
Which statement about copyright is correct?  
A) It protects an idea even if it has never been written down  
B) It lets anyone copy software once they have bought one copy  
C) It protects only works that are published on paper  
**D) It protects the way an idea is expressed, not the idea itself ✓**  
_Copyright covers the expression of an idea, such as the actual text, code or recording, not the bare idea. Buying one copy does not give the right to make more copies, and digital works are protected too._

**cs-03-039** · CS-3.2 · M  
A student scans a paid e-book and shares the PDF with his whole class group so nobody needs to buy it. This is:  
**A) Copyright infringement ✓**  
B) Fair sharing of public domain work  
C) Legal because it is for studying  
D) Allowed because the book was bought once  
_Copying and distributing a whole paid book without the owner's permission breaks copyright. Buying one copy gives the right to read it, not to give copies to everyone._

**cs-03-048** · CS-3.3 · M  
Zara shares a group project document. Two members only need to read it. Which permission should she give them?  
A) Edit  
B) Owner  
**C) View only ✓**  
D) Edit and share  
_Giving people only the access they need (view only) protects the document from accidental or unwanted changes. Edit rights are unnecessary for people who only read._

**cs-03-050** · CS-3.3 · M  
Asad receives an e-mail saying his bank account is blocked and asking him to click a link and log in. What is the safest action?  
**A) Do not click; contact the bank through its official website or helpline ✓**  
B) Click the link quickly before the account closes  
C) Reply with his account number to ask for help  
D) Forward the e-mail to friends to warn them, then log in  
_Urgent messages with login links are a common phishing trick, so he should check through the bank's own official contact details. Clicking the link or replying with details gives the attacker what he wants._

**cs-03-058** · CS-3.3 · D  
A class teacher wants to share a document of students' marks with three other teachers. Which sharing setting is safest?  
A) Anyone with the link can edit  
**B) Share with only those three teachers by name ✓**  
C) Anyone with the link can view  
D) Post the link in the class group  
_Sharing with named people keeps private marks within the people who need them. Any 'anyone with the link' setting means a forwarded link opens the document to anyone, and editing access adds the risk of changes._

## cs-04 — Applications and Emerging Technologies (10 of 60)

**cs-04-008** · CS-4.1 · M  
In a hospital, a computer connected to sensors on a patient watches the heart rate and sounds an alarm if it goes outside safe limits. This use is called:  
A) Computer-aided design  
B) Online banking  
C) Desktop publishing  
**D) Patient monitoring ✓**  
_Computers read sensor values continuously and warn staff when readings become dangerous, which is patient monitoring. The other uses have nothing to do with a patient's readings._

**cs-04-015** · CS-4.1 · M  
Buying and selling goods and services over the Internet is called:  
A) E-learning  
B) Telemedicine  
C) Computer-aided design  
**D) E-commerce ✓**  
_E-commerce covers online shopping, ordering and payment. E-learning is education online and telemedicine is health care at a distance._

**cs-04-016** · CS-4.1 · M  
In a chemical plant, a computer reads temperature sensors and opens a cooling valve whenever a tank gets too hot. This use is called:  
A) Computer-aided design  
B) Word processing  
**C) Process control ✓**  
D) Desktop publishing  
_In process control a computer watches sensor readings and adjusts the machinery automatically to keep the process safe. CAD is only for drawing designs._

**cs-04-030** · CS-4.2 · M  
A hospital keeps patient records in its own private cloud but uses a public cloud to run its appointment-booking website. This deployment model is a:  
A) Public cloud  
**B) Hybrid cloud ✓**  
C) Private cloud  
D) Peer-to-peer network  
_A hybrid cloud combines a private cloud with a public cloud. Calling it only private or only public ignores one of the two parts._

**⚠ cs-04-031** · CS-4.2 · M  
A company uses storage from one public cloud provider and machine-learning services from a different public cloud provider. This is best described as:  
A) Hybrid cloud  
B) Private cloud  
**C) Multi-cloud ✓**  
D) Virtual machine  
_Using services from more than one public cloud provider is multi-cloud. A hybrid cloud needs a private cloud joined with a public one, and there is no private cloud here._

**cs-04-037** · CS-4.2 · D  
Moving from IaaS to PaaS to SaaS, which statement is true?  
A) The customer manages more and the provider manages less  
B) The customer manages the same things in all three  
**C) The customer manages less and the provider manages more ✓**  
D) Only SaaS is delivered over the Internet  
_IaaS leaves the operating system and apps to the customer, PaaS leaves only the customer's own app, and SaaS leaves almost nothing. All three are delivered over the Internet._

**cs-04-046** · CS-4.3 · M  
A shop gives a program its customers' purchase data, with no labels, and asks it to find groups of customers who buy similar things. This type of learning is:  
A) Supervised learning  
B) Reinforcement learning  
**C) Unsupervised learning ✓**  
D) Natural language processing  
_Finding groups (clusters) in unlabelled data is unsupervised learning. Supervised learning would need each customer to be labelled with a group in advance._

**cs-04-048** · CS-4.3 · M  
A chatbot that understands questions typed in ordinary language and replies in sentences mainly uses which branch of AI?  
A) Computer vision  
**B) Natural language processing ✓**  
C) Robotics  
D) Virtualisation  
_Natural language processing lets computers understand and produce human language. Computer vision deals with images, not text._

**cs-04-052** · CS-4.3 · M  
Which of the following is an example of IoT?  
**A) A home thermostat that reads the room temperature and can be controlled from a phone over the Internet ✓**  
B) A pocket calculator with no network connection  
C) A printed school timetable on a notice board  
D) A desktop computer used offline only for typing  
_The thermostat has a sensor, is connected to the Internet and can be controlled remotely, which is what IoT means. The calculator and offline computer are not connected things._

**cs-04-056** · CS-4.3 · M  
Why is a machine-learning model checked on test data that it did not see during training?  
A) To make the training run faster  
B) To add more labels to the training data  
**C) To find out how well it works on new, unseen data ✓**  
D) To store the model inside a blockchain  
_Testing on unseen data shows whether the model has learned general patterns rather than only remembering its training examples. It does not speed up training._

## cs-05 — Operating Systems and Office Software (10 of 70)

**cs-05-001** · CS-5.1 · E  
Which key combination is commonly used to copy selected text in Windows?  
A) Ctrl + V  
B) Ctrl + X  
C) Ctrl + Z  
**D) Ctrl + C ✓**  
_Ctrl + C copies the selection. Ctrl + V pastes, Ctrl + X cuts and Ctrl + Z undoes the last action._

**cs-05-008** · CS-5.1 · M  
Which of the following is a function of an operating system?  
A) Designing web pages for different users  
B) Drawing pictures and company logos  
C) Calculating the salaries of the staff  
**D) Allocating memory to running programs ✓**  
_Managing memory, processes, files and devices are core tasks of an OS. The other tasks are done by application software._

**⚠ cs-05-014** · CS-5.1 · M  
In a Windows file search, which pattern matches every file whose extension is .txt, whatever the length of its name?  
A) #.txt  
**B) *.txt ✓**  
C) ?.txt  
D) txt.*  
_The wildcard * stands for any number of characters, so `*.txt` matches every .txt file. The wildcard ? stands for exactly one character, so `?.txt` matches only one-letter names such as `a.txt`._

**cs-05-016** · CS-5.1 · M  
Which statement correctly compares MS-DOS and Windows?  
A) MS-DOS uses icons and windows; Windows works only with typed commands  
B) Both work only with typed commands and have no mouse support  
C) Both are application programs that run on top of another OS  
**D) MS-DOS works with typed commands; Windows uses icons, windows and a mouse pointer ✓**  
_MS-DOS has a command-line interface where the user types commands, while Windows has a graphical user interface (GUI). The second option reverses the two._

**cs-05-017** · CS-5.1 · M  
A new printer is connected, but Windows cannot use it until a small program written for that printer is installed. This program is called a:  
**A) Device driver ✓**  
B) Compiler  
C) Macro  
D) Print spooler  
_A device driver lets the OS communicate with a particular hardware device. The print spooler only queues print jobs; it still needs the driver to talk to the printer._

**⚠ cs-05-024** · CS-5.1 · D  
The Delete key is used to delete one file from the hard disk C: and another file from a USB flash drive. Which statement is correct?  
**A) The file from C: goes to the Recycle Bin; the file from the USB drive is removed permanently ✓**  
B) Both files go to the Recycle Bin and can be restored  
C) Both files are removed permanently at once  
D) The file from the USB drive goes to the Recycle Bin; the file from C: is removed permanently  
_Windows keeps a Recycle Bin for files deleted from the hard disk, but files deleted from a removable flash drive are not moved there. So only the file from C: can be restored from the bin._

**cs-05-027** · CS-5.2 · M  
In mail merge, the list of names and addresses that supplies a different value to each copy of the letter is called the:  
A) Template  
B) Header  
**C) Data source ✓**  
D) Main document  
_The data source holds the records, one per recipient. The main document holds the text that is the same in every letter, with merge fields where the data goes._

**cs-05-029** · CS-5.2 · M  
In a mail-merge letter, what happens to a merge field such as «FirstName» when the letters are merged?  
A) It is printed exactly as «FirstName» in every letter  
**B) It is replaced by the value from each record of the data source ✓**  
C) It is deleted from every letter  
D) It is replaced by the name of the data-source file  
_Each merge field is a placeholder: in each letter it is filled with that record's value, such as Ayesha in one letter and Bilal in the next. It is never printed as the field name in the merged result._

**cs-05-032** · CS-5.2 · M  
In a table, two neighbouring cells in a row are selected and combined into one larger cell. This operation is:  
**A) Merge cells ✓**  
B) Split cells  
C) Insert column  
D) AutoFit  
_Merging joins the selected cells into one. Splitting does the opposite: it divides one cell into several._

**cs-05-062** · CS-5.3 · M  
A1 holds 5 and A2 holds 10. Both cells are selected and the fill handle is dragged down to A5. What does A5 show?  
A) 15  
B) 20  
C) 10  
**D) 25 ✓**  
_Two selected values set a series with a step of 5: 5, 10, 15, 20, 25 in A1 to A5, so A5 is 25. 20 is the value in A4, one cell short._

## cs-06 — Databases (10 of 80)

**cs-06-008** · CS-6.1 · M  
Which of the following is a disadvantage of the traditional file-processing approach compared with a database?  
**A) Data redundancy and inconsistency ✓**  
B) Better sharing of data between users  
C) Centralised security of all the data  
D) Easy enforcement of data integrity  
_In separate files, the same data is repeated in many places and copies can disagree. A DBMS reduces this and offers sharing and security._

**⚠ cs-06-035** · CS-6.1 · M  
A sequential file holds 1000 student records stored one after another. To read the record at position 500, the computer must start from the beginning. How many records does it read before it reaches that record?  
A) 250  
B) 1  
**C) 499 ✓**  
D) 0  
_In a sequential file, every earlier record is read first: records 1 to 499, so 499 come before it. 250 is half of that, as if the search could start in the middle, and 0 would be true only for direct access, which goes straight to the record._

**⚠ cs-06-039** · CS-6.1 · D  
A bank's file must be processed in account-number order at the end of each day and must also let a clerk find any single account quickly. Which organisation supports both needs?  
A) Sequential  
B) Direct (random)  
**C) Indexed sequential ✓**  
D) Unordered serial  
_Indexed sequential keeps records in key order for sequential processing and adds an index for fast single look-ups. A purely sequential file is slow for one record, and a direct file is not kept in key order._

**⚠ cs-06-048** · CS-6.1 · D  
A direct file stores the record with key k at address k mod 7 (the remainder after dividing by 7). Which pair of keys would be sent to the same address?  
A) 8 and 16  
**B) 15 and 22 ✓**  
C) 15 and 21  
D) 10 and 20  
_15 mod 7 = 1 and 22 mod 7 = 1, so both go to address 1 (a collision). The others differ: 15 and 21 give 1 and 0, 10 and 20 give 3 and 6, 8 and 16 give 1 and 2._

**⚠ cs-06-053** · CS-6.3 · M  
During database design, which step describes the data without depending on any particular DBMS and is usually drawn as an ER diagram?  
A) Implementation  
**B) Conceptual design ✓**  
C) Maintenance  
D) Physical design  
_Conceptual design produces an ER model of entities and relationships that does not depend on the DBMS. Physical design decides how the data will be stored on a chosen DBMS._

**⚠ cs-06-054** · CS-6.3 · M  
In which step of database design are decisions made about storage structures, file organisation and indexes on the chosen DBMS?  
A) Conceptual design  
**B) Physical design ✓**  
C) Requirements analysis  
D) Testing  
_Physical design turns the logical tables into storage details such as indexes and file organisation. Conceptual design does not deal with storage at all._

**⚠ cs-06-055** · CS-6.3 · M  
Before any design is drawn, the designers interview the users of a hospital to find out what data they record and what reports they need. This is which step of the database life cycle?  
A) Physical design  
B) Implementation  
C) Testing  
**D) Requirements analysis ✓**  
_Requirements analysis collects the users' data needs; the design steps come after it. Implementation is when the tables are actually created on the DBMS._

**⚠ cs-06-058** · CS-6.3 · M  
The relationship "a teacher teaches a subject to a class" links three entities, Teacher, Subject and Class, at the same time. What is the degree of this relationship?  
**A) Ternary ✓**  
B) Binary  
C) Unary  
D) Quaternary  
_The degree of a relationship is the number of entities taking part: three gives a ternary relationship. Binary relationships link only two entities._

**⚠ cs-06-059** · CS-6.3 · M  
In the relationship "an employee supervises other employees", both ends of the relationship are the same entity, Employee. What is this relationship called?  
A) Binary  
B) Ternary  
C) Many-to-many  
**D) Unary (recursive) ✓**  
_A relationship of an entity with itself is unary, also called recursive. A binary relationship links two different entities._

**cs-06-072** · CS-6.4 · M  
Enrol(StudentID, Name, CourseID, CourseTitle) is keyed on (StudentID, CourseID). A new course CS12 cannot be recorded until some student enrols in it. This is a:  
A) Referential integrity violation  
B) Deletion anomaly  
C) Update anomaly  
**D) Insertion anomaly ✓**  
_The course's details cannot be inserted without a StudentID, because part of the key would be NULL. A deletion anomaly loses data when a row is removed, which is not what happens here._

## cs-07 — MS Access (10 of 60)

**cs-07-008** · CS-7.2 · M  
Table Student(RollNo, Name, City, Marks) holds these rows: (1, Ayesha, Lahore, 78), (2, Bilal, Karachi, 65), (3, Hina, Lahore, 82), (4, Usman, Multan, 65), (5, Sana, Karachi, 90).
What does this query return?
```
SELECT Name FROM Student WHERE Marks > 70 ORDER BY Name;
```  
A) Ayesha; Hina; Sana; Bilal  
**B) Ayesha; Hina; Sana ✓**  
C) Bilal; Usman  
D) Sana; Hina; Ayesha  
_Marks above 70 belong to Ayesha (78), Hina (82) and Sana (90), and ORDER BY Name sorts them alphabetically. Bilal and Usman have 65. The rows are shown here separated by semicolons._

**cs-07-015** · CS-7.2 · E  
Which SQL command is used to retrieve data from a table?  
A) INSERT  
B) UPDATE  
C) CREATE  
**D) SELECT ✓**  
_SELECT reads data. INSERT adds a row, UPDATE changes existing rows and CREATE makes a new object such as a table._

**⚠ cs-07-025** · CS-7.1 · M  
A school wants to keep each student's photograph inside the Access table. Which data type is meant for embedding a picture?  
A) Hyperlink  
B) Long Text (Memo)  
C) Yes/No  
**D) OLE Object ✓**  
_An OLE Object field embeds or links objects such as pictures and documents. A Hyperlink field only stores an address pointing to something else._

**cs-07-031** · CS-7.1 · D  
Table Student(RollNo, Name, City, Phone) holds: (101, Ali, Lahore, 0300-1111111), (102, Sara, Multan, 0301-2222222), (103, Ali, Karachi, empty), (104, Hina, Lahore, 0302-3333333). Which single field can be the primary key?  
**A) RollNo ✓**  
B) Name  
C) City  
D) Phone  
_A primary key must be unique and can never be empty; only RollNo meets both. Phone values are all different, but record 103 has no phone, and Name and City repeat._

**cs-07-037** · CS-7.1 · M  
A user enters a student's details through a form. Which Access object actually stores the data?  
A) The form  
**B) The table ✓**  
C) The report  
D) The query  
_All data in an Access database lives in tables. Forms and reports only show it, and a select query only picks records from tables._

**⚠ cs-07-038** · CS-7.1 · D  
In the Relationships window, Student.RollNo (the primary key of Student) is joined to Hostel.RollNo, which is also the primary key of Hostel. Which relationship type does Access create?  
A) One-to-many  
B) Many-to-many  
C) No relationship, since a key cannot be joined to a key  
**D) One-to-one ✓**  
_When the fields on both sides are unique (primary keys), each record can match at most one record on the other side, so the relationship is one-to-one. One-to-many needs the field on the many side to allow repeats._

**⚠ cs-07-039** · CS-7.1 · D  
Class.ClassID is an AutoNumber primary key. Student.ClassID will be joined to it with referential integrity. Which data type should Student.ClassID have?  
A) AutoNumber  
B) Short Text (Text)  
**C) Number (Long Integer) ✓**  
D) Yes/No  
_An AutoNumber is stored as a Long Integer, so the matching foreign key must be Number with Field Size Long Integer. It cannot be AutoNumber itself, because then Access would invent the value instead of letting it match an existing class._

**cs-07-048** · CS-7.3 · M  
On an order form, a text box has the Control Source `=[Price]*[Quantity]`. For the current record Price is 120 and Quantity is 3. What happens?  
A) The text box shows 360, and Access saves it in a new field  
B) The text box shows the words Price*Quantity  
**C) The text box shows 360, and the value is not saved in the table ✓**  
D) The text box stays empty until 360 is typed  
_A Control Source starting with = makes a calculated control: it works out 120 × 3 = 360 each time the record is shown but stores nothing. Saving a value needs a bound control with a field as its Control Source._

**cs-07-050** · CS-7.3 · M  
A form must show the records of the query qryLahore. Which property of the form names qryLahore?  
**A) Record Source ✓**  
B) Control Source  
C) Row Source  
D) Default Value  
_The form's Record Source is the table or query it is bound to. Control Source belongs to a single control, and Row Source supplies the list of a combo box or list box._

**cs-07-058** · CS-7.3 · M  
Which Form Wizard layout shows one record at a time, with its fields placed one under the other?  
A) Tabular  
**B) Columnar ✓**  
C) Datasheet  
D) Justified  
_Columnar puts each field on its own line for a single record. Tabular and Datasheet show many records at once in rows._

## cs-08 — C Programming Basics (10 of 80)

**cs-08-008** · CS-8.2 · M  
What is the output of the following code?
```
int x = 5;
int y = x++;
printf("%d %d", x, y);
```  
**A) 6 5 ✓**  
B) 5 6  
C) 6 6  
D) 5 5  
_Post-increment gives y the old value 5 first and then raises x to 6. So x = 6 and y = 5; the output "6 6" would be right for ++x._

**cs-08-015** · CS-8.2 · M  
What is the output of the following code?
```
int x = 10 / 4 * 2;
printf("%d", x);
```  
A) 5  
**B) 4 ✓**  
C) 1  
D) 20  
_Left to right: 10 / 4 = 2 in integer division, then 2 × 2 = 4. The value 5 would come from doing the multiplication first._

**cs-08-016** · CS-8.2 · D  
What is the output of the following code?
```
float f = 10 / 4;
printf("%.1f", f);
```  
**A) 2.0 ✓**  
B) 2.5  
C) 2  
D) 3.0  
_10 / 4 is evaluated first as an integer division giving 2, and only then stored as 2.0 in the float. Writing 10.0 / 4 would give 2.5._

**cs-08-030** · CS-8.1 · M  
What is printed?
```
#define MAX 10

int main()
{
    printf("MAX = %d", MAX);
    return 0;
}
```  
**A) MAX = 10 ✓**  
B) 10 = 10  
C) MAX = MAX  
D) 10 = MAX  
_The preprocessor does not replace names inside a string literal, so the text MAX = stays as it is, while the second MAX becomes 10 and is printed by %d._

**cs-08-036** · CS-8.1 · E  
A programmer forgets the semicolon at the end of a statement. What kind of error is this?  
A) Logical error  
**B) Syntax error ✓**  
C) Run-time error  
D) Linker error  
_Breaking the grammar rules of the language is a syntax error, and the compiler reports it. A logical error does not break any rule; it only gives a wrong result._

**cs-08-051** · CS-8.2 · M  
What is printed?
```
printf("%d", !0 + 3 * 2);
```  
**A) 7 ✓**  
B) 6  
C) 0  
D) 8  
_! has the highest precedence here, so !0 is 1; then 3 * 2 = 6 and 1 + 6 = 7. The answer 0 wrongly applies ! to the whole expression._

**cs-08-054** · CS-8.2 · M  
What is printed?
```
printf("%d", 'a' - 'A');
```  
A) 0  
B) 1  
**C) 32 ✓**  
D) 26  
_Characters are stored as ASCII codes: 'a' is 97 and 'A' is 65, so the difference is 32. It is not 0, because small and capital letters have different codes._

**cs-08-060** · CS-8.3 · M  
What is printed?
```
printf("%.2f", 3.14159);
```  
A) 3.141  
B) 3.15  
C) 3.14159  
**D) 3.14 ✓**  
_%.2f prints two digits after the decimal point; the third digit is 1, so 3.14159 rounds to 3.14. 3.15 would need the third digit to be 5 or more._

**⚠ cs-08-075** · CS-8.3 · D  
The user types `Ali Khan` and presses Enter. What is printed?
```
char name[20];
scanf("%s", name);
printf("Hello %s", name);
```  
A) Hello Ali Khan  
B) Hello Khan  
C) Hello  
**D) Hello Ali ✓**  
_%s in scanf stops reading at the first space, so name holds only Ali. Reading the whole line with the space would need a different input function._

**⚠ cs-08-078** · CS-8.3 · M  
What is printed?
```
printf("%05d", 42);
```  
A) 42000  
**B) 00042 ✓**  
C) 0042  
D) 42  
_The 0 flag fills the 5-wide field with leading zeros instead of spaces, giving 00042. The zeros are added on the left, not the right._

## cs-09 — C Control Structures and Functions (10 of 110)

**cs-09-008** · CS-9.1 · D  
What is the output of the following code?
```
int x = 5;
if (x = 0)
    printf("zero");
else
    printf("nonzero");
```  
A) zero  
**B) nonzero ✓**  
C) Compile error  
D) 5  
_The single = assigns 0 to x, and the value of the expression is 0, which counts as false. So the else part runs and prints nonzero._

**cs-09-030** · CS-9.1 · M  
What is printed?
```
int m = 85;
if (m >= 50)
    printf("P");
if (m >= 70)
    printf("G");
if (m >= 80)
    printf("E");
```  
**A) PGE ✓**  
B) E  
C) P  
D) GE  
_These are three separate if statements, not an else-if chain, so each one is tested. 85 passes all three tests, giving PGE; only an else-if chain would stop after P._

**⚠ cs-09-031** · CS-9.1 · D  
What is printed?
```
int x = 5, y = 10;
if (x > 8)
    if (y > 8)
        printf("one");
else
    printf("two");
printf("end");
```  
A) twoend  
**B) end ✓**  
C) oneend  
D) two  
_An else belongs to the nearest unmatched if, here if (y > 8), whatever the indentation. Since x > 8 is false, the whole inner if-else is skipped and only end is printed; twoend would need braces around the inner if._

**⚠ cs-09-032** · CS-9.1 · M  
What is printed?
```
int a = 3;
if (a > 5)
    printf("big ");
    printf("done");
```  
A) big done  
B) big  
**C) done ✓**  
D) (nothing is printed)  
_Without braces only the first statement belongs to the if. 3 > 5 is false, so big is skipped, but the second printf is outside the if and always runs._

**⚠ cs-09-044** · CS-9.1 · D  
What is printed?
```
int x = 50;
if (10 <= x <= 20)
    printf("inside");
else
    printf("outside");
```  
A) outside  
**B) inside ✓**  
C) an error  
D) insideoutside  
_C evaluates 10 <= x <= 20 from left to right: 10 <= 50 gives 1, then 1 <= 20 gives 1, which is true. So inside is printed even though 50 is outside the range; the right test is x >= 10 && x <= 20._

**⚠ cs-09-045** · CS-9.1 · M  
What is printed?
```
int x = 2;
if (x > 5);
    printf("big ");
printf("end");
```  
**A) big end ✓**  
B) end  
C) big  
D) (nothing is printed)  
_The semicolon right after if (x > 5) is an empty statement that forms the whole body of the if. The printf("big ") line is therefore not controlled by the if and always runs, followed by end._

**⚠ cs-09-049** · CS-9.1 · D  
What is printed?
```
int a = 5, b = 5, c = 5;
if (a == b == c)
    printf("same");
else
    printf("different");
```  
A) same  
B) an error  
C) samedifferent  
**D) different ✓**  
_== works from left to right: a == b gives 1, then 1 == c compares 1 with 5, which is 0 (false). So different is printed although all three are equal; the right test is a == b && b == c._

**⚠ cs-09-051** · CS-9.1 · M  
What is printed?
```
char ch = 'a' + 1;
switch (ch) {
    case 'a': printf("first"); break;
    case 'b': printf("second"); break;
    default: printf("other");
}
```  
A) first  
**B) second ✓**  
C) other  
D) firstsecond  
_Characters are stored as codes, and the code after 'a' is 'b', so ch holds 'b'. case 'b' prints second and break stops there._

**cs-09-053** · CS-9.1 · M  
Which `if-else` does the same job as `y = (x > 0) ? x : -x;`?  
**A) `if (x > 0) y = x; else y = -x;` ✓**  
B) `if (x > 0) y = -x; else y = x;`  
C) `if (x < 0) y = x; else y = -x;`  
D) `if (x > 0) y = x; y = -x;`  
_The value before the colon is used when the condition is true and the one after it when it is false. Writing y = x; y = -x; without else always leaves y equal to -x._

**⚠ cs-09-104** · CS-9.4 · M  
In `while ((ch = fgetc(fp)) != EOF)`, why is `ch` usually declared as `int` rather than `char`?  
A) Because fgetc can read only digits  
**B) So it can hold EOF, which differs from every character value ✓**  
C) Because a char variable cannot be compared with !=  
D) So that the loop runs faster  
_fgetc returns an int: either a character code or the special value EOF. A plain char may not keep EOF apart from a real character, so the end of the file could be missed or found too early; int avoids this._

## cs-10 — Software Development (10 of 50)

**cs-10-008** · CS-10.1 · E  
Agile methods develop software by  
A) completing all design before writing any code  
B) writing full documentation before meeting the client  
C) testing only once after the whole program is written  
**D) delivering small working parts in short repeated cycles ✓**  
_Agile is iterative and incremental: each short cycle (sprint) ends with a small working part. Finishing all design first is the Waterfall approach._

**⚠ cs-10-011** · CS-10.1 · M  
The finished system is installed at the client's office, old records are moved into it and staff are trained to use it. Which SDLC stage is this?  
A) Requirements analysis  
**B) Deployment ✓**  
C) Design  
D) Testing  
_Installing the system, converting data and training users is deployment (some books call it installation). Testing happens before this, while the system is still with the developers._

**cs-10-016** · CS-10.1 · D  
In a Waterfall plan the stages run one after another with no overlap: analysis 2 weeks, design 3 weeks, coding 5 weeks, testing 2 weeks. If analysis starts at the beginning of week 1, in which week does testing begin?  
**A) Week 11 ✓**  
B) Week 10  
C) Week 12  
D) Week 13  
_Analysis takes weeks 1-2, design weeks 3-5, coding weeks 6-10, so testing begins in week 11. Week 10 is the last week of coding (2 + 3 + 5 = 10 weeks used)._

**cs-10-017** · CS-10.1 · M  
An Agile team works in 3-week sprints and gives the client a working increment at the end of each sprint. Sprint 1 starts at the beginning of week 1. At the end of which week does the client receive the 4th increment?  
A) Week 9  
B) Week 15  
**C) Week 12 ✓**  
D) Week 4  
_Sprints end at weeks 3, 6, 9 and 12, so the 4th increment arrives at the end of week 12 (4 × 3). Week 9 is the 3rd increment._

**⚠ cs-10-027** · CS-10.1 · M  
Which of these is a non-functional requirement for a result-checking app?  
A) The app must show a student's marks when a roll number is entered  
**B) The result page must load within 2 seconds ✓**  
C) The app must let the admin add a new subject  
D) The app must print a mark sheet for a student  
_A non-functional requirement describes how well the system works, such as speed. Showing marks, adding subjects and printing mark sheets are things the system does, so they are functional requirements._

**⚠ cs-10-030** · CS-10.1 · D  
Risk exposure = probability × loss. Risk R1 has probability 0.5 and loss Rs 40,000. Risk R2 has probability 0.1 and loss Rs 300,000. Which statement is correct?  
A) R1 has the higher exposure, Rs 20,000  
B) R2 has the higher exposure, Rs 300,000  
**C) R2 has the higher exposure, Rs 30,000 ✓**  
D) Both have the same exposure, Rs 20,000  
_R1: 0.5 × 40,000 = Rs 20,000. R2: 0.1 × 300,000 = Rs 30,000, so R2 is higher. Rs 300,000 is R2's loss before multiplying by its probability._

**cs-10-033** · CS-10.2 · E  
Following a program by hand, line by line, and writing down each variable's value after every step is called  
**A) a dry run ✓**  
B) beta testing  
C) integration testing  
D) compiling  
_A dry run is a manual trace of the code that helps find logic errors without a computer. Compiling translates the code; it does not trace values._

**cs-10-039** · CS-10.2 · D  
What does this C code print?
```
int x = 3;
if (x = 5)
    printf("five");
else
    printf("not five");
```  
**A) five ✓**  
B) not five  
C) (nothing is printed)  
D) 3  
_`x = 5` is an assignment, not a comparison: x becomes 5 and the condition's value is 5, which is non-zero (true), so `five` is printed. Using `=` instead of `==` is a classic logic error; with `==` it would print `not five`._

**cs-10-048** · CS-10.2 · M  
After fixing a bug in the fee calculation, the team re-runs all the earlier tests to make sure the fix has not broken anything else. This is  
A) beta testing  
**B) regression testing ✓**  
C) acceptance testing  
D) a dry run  
_Re-running earlier tests after a change, to catch new faults caused by it, is regression testing. Beta testing gives the product to outside users._

**cs-10-050** · CS-10.2 · M  
Which statement correctly separates testing from debugging?  
A) Testing fixes errors; debugging only reports them  
B) Testing is done only by the compiler; debugging only by users  
**C) Testing shows that an error exists; debugging finds its cause and fixes it ✓**  
D) They are the same activity with two names  
_Testing runs the program to reveal that something is wrong; debugging then locates the faulty code and corrects it. The roles are not reversed._

## cs-11 — Python Programming (10 of 110)

**cs-11-008** · CS-11.1 · D  
What is printed?
```
s = "programming"
print(s[::3])
```  
A) pgan  
**B) pgmn ✓**  
C) prgm  
D) pgmng  
_`s[::3]` takes every third character from index 0: indexes 0, 3, 6, 9 are p, g, m, n, so pgmn. Index 12 would be past the end (the last index is 10), so no extra g is added._

**⚠ cs-11-018** · CS-11.1 · M  
What is printed?
```
a = 2 * 3.14159
print(f"Area = {a:.2f}")
```  
**A) Area = 6.28 ✓**  
B) Area = 6.283  
C) Area = 6.2832  
D) Area = {a:.2f}  
_a is 6.28318; in an f-string `:.2f` shows it with 2 digits after the decimal point, 6.28. The braces are replaced by the value because the string starts with f._

**cs-11-031** · CS-11.2 · M  
What is printed?
```
print(10 == 10.0, "10" == 10)
```  
A) True True  
B) False False  
C) False True  
**D) True False ✓**  
_10 and 10.0 are equal numbers, so the first test is True; a string is never equal to a number, so "10" == 10 is False. Python does not convert "10" to a number when comparing._

**⚠ cs-11-035** · CS-11.2 · M  
What is printed?
```
marks = 72
if marks >= 80:
    print("Excellent")
elif marks >= 70:
    print("Good")
elif marks >= 60:
    print("Fair")
else:
    print("Fail")
```  
A) Excellent  
B) Good, then Fair on the next line  
**C) Good ✓**  
D) Fair  
_72 >= 80 is False, 72 >= 70 is True, so Good is printed and the rest of the if-elif chain is skipped. Only the first True branch of an elif chain runs, so Fair is not printed as well._

**⚠ cs-11-048** · CS-11.2 · D  
What is printed?
```
x = 0
if x != 0 and 10 / x > 1:
    print("big")
else:
    print("safe")
```  
A) big  
**B) safe ✓**  
C) a ZeroDivisionError  
D) (nothing is printed)  
_`x != 0` is False, so `and` stops there (short-circuit) and `10 / x` is never worked out; the else branch prints safe. The division by zero would happen only if the first part were True._

**cs-11-050** · CS-11.2 · D  
What is printed?
```
n = 12345
s = 0
while n > 0:
    s += n % 10
    n //= 10
print(s)
```  
**A) 15 ✓**  
B) 14  
C) 10  
D) 54321  
_Each pass adds the last digit (`n % 10`) and removes it (`n //= 10`): 5 + 4 + 3 + 2 + 1 = 15, then n is 0 and the loop stops. The loop sums the digits; it does not reverse the number._

**⚠ cs-11-076** · CS-11.3 · M  
What is printed?
```
def f(n):
    if n == 0:
        return 1
    return n * f(n - 1)
print(f(4))
```  
A) 10  
B) 12  
C) 0  
**D) 24 ✓**  
_f(4) = 4 * f(3) = 4 * 3 * f(2) = 4 * 3 * 2 * f(1) = 4 * 3 * 2 * 1 * f(0), and f(0) returns 1, so 24. The base case returns 1, not 0, so the product is not 0._

**⚠ cs-11-087** · CS-11.4 · M  
What is printed?
```
class Student:
    def __init__(self, name, marks):
        self.name = name
        self.marks = marks
    def grade(self):
        if self.marks >= 80:
            return "Merit"
        return "Pass"
s1 = Student("Ayesha", 84)
s2 = Student("Bilal", 76)
print(s1.grade(), s2.grade())
```  
A) Merit Merit  
B) Pass Pass  
C) Pass Merit  
**D) Merit Pass ✓**  
_s1’s marks are 84, which is >= 80, so it returns Merit; s2’s marks are 76, so the `if` fails and it returns Pass. Each object keeps its own marks._

**⚠ cs-11-096** · CS-11.4 · M  
What is printed?
```
class Animal:
    pass
class Dog(Animal):
    pass
print(isinstance(Dog(), Animal), isinstance(Animal(), Dog))
```  
**A) True False ✓**  
B) True True  
C) False True  
D) False False  
_A Dog object is also an Animal because Dog inherits from Animal, so the first is True; an Animal object is not a Dog, so the second is False. Inheritance works in one direction only._

**⚠ cs-11-108** · CS-11.5 · M  
What is meant by an event-driven program, such as a Tkinter GUI?  
A) It runs every statement once from top to bottom and then stops  
**B) Its code runs in response to user actions such as clicks and key presses ✓**  
C) It runs only at fixed times set by the system clock  
D) It reads all its input from a file before it starts  
_A GUI program waits in its event loop and calls a handler (callback) when an event like a button click happens. Running once from top to bottom describes a simple sequential script._

## cs-12 — Algorithms and Data Structures (10 of 80)

**cs-12-008** · CS-12.1 · M  
Which of these is a decision problem (one whose answer is simply yes or no)?  
**A) Is 91 a prime number? ✓**  
B) Find the largest number in a list  
C) Arrange a list of names alphabetically  
D) Find the shortest road from P to Q  
_"Is 91 a prime number?" can only be answered yes or no (here no, as 91 = 7 × 13). Finding the largest number is a search problem and finding the shortest road is an optimisation problem; their answers are values, not yes or no._

**⚠ cs-12-014** · CS-12.1 · M  
A set of steps works on most inputs but, for one input, keeps repeating forever without stopping. Which property of an algorithm does it fail?  
**A) Finiteness ✓**  
B) Input  
C) Definiteness  
D) Output  
_An algorithm must end after a finite number of steps (finiteness). Definiteness means each step is clear and unambiguous; the steps here may be clear, but they never finish._

**cs-12-016** · CS-12.1 · D  
What is printed?
```
total = 0
for i in range(1, 5):
    for j in range(i):
        total += 1
print(total)
```  
**A) 10 ✓**  
B) 16  
C) 6  
D) 15  
_i takes 1, 2, 3, 4 (5 is excluded) and the inner loop runs i times, so total = 1 + 2 + 3 + 4 = 10. 16 assumes the inner loop runs 4 times each pass; 15 wrongly includes i = 5._

**cs-12-017** · CS-12.2 · E  
Binary search can be used only when the list is:  
**A) sorted ✓**  
B) free of duplicate values  
C) of even length  
D) stored in a linked list  
_Binary search compares with the middle element and discards half the list, which works only if the list is in order. Duplicates and odd or even length do not stop it._

**⚠ cs-12-019** · CS-12.2 · M  
Bubble sort (ascending) goes left to right and swaps each adjacent pair whose left value is larger. What is the list after the first full pass on `[5, 1, 4, 2, 8]`?  
**A) [1, 4, 2, 5, 8] ✓**  
B) [1, 2, 4, 5, 8]  
C) [1, 5, 4, 2, 8]  
D) [1, 4, 5, 2, 8]  
_5,1 swap → [1, 5, 4, 2, 8]; 5,4 swap → [1, 4, 5, 2, 8]; 5,2 swap → [1, 4, 2, 5, 8]; 5,8 no swap. One pass only moves the largest value to the end, so the list is not yet fully sorted._

**cs-12-032** · CS-12.2 · M  
A list of n values is already in ascending order. Which of these takes about n steps (O(n)) to sort it?  
A) Selection sort  
B) Bubble sort that always makes all n − 1 passes  
**C) Insertion sort ✓**  
D) Merge sort  
_On a sorted list insertion sort compares each new element once with the one before it and moves nothing, so it takes O(n). Selection sort still scans the whole unsorted part every pass (O(n²)), and merge sort is O(n log n) on any input._

**cs-12-038** · CS-12.2 · D  
Bubble sort (descending) goes left to right and swaps each adjacent pair whose left value is smaller. What is the list after the first full pass on `[3, 9, 4, 7, 1]`?  
A) [9, 7, 4, 3, 1]  
**B) [9, 4, 7, 3, 1] ✓**  
C) [3, 4, 7, 1, 9]  
D) [9, 3, 4, 7, 1]  
_3 < 9 swap → [9, 3, 4, 7, 1]; 3 < 4 swap → [9, 4, 3, 7, 1]; 3 < 7 swap → [9, 4, 7, 3, 1]; 3 < 1 no. The smallest value moves to the end; [9, 7, 4, 3, 1] needs more passes._

**cs-12-053** · CS-12.3 · D  
The values 15, 8, 20, 3, 10 are inserted in that order into an empty binary search tree (smaller values go left, larger go right). What is its pre-order traversal (node, left subtree, right subtree)?  
A) 3, 8, 10, 15, 20  
**B) 15, 8, 3, 10, 20 ✓**  
C) 3, 10, 8, 20, 15  
D) 15, 8, 20, 3, 10  
_The tree has root 15, left child 8 (with children 3 and 10) and right child 20. Pre-order gives 15, 8, 3, 10, 20. 3, 8, 10, 15, 20 is the in-order traversal, which is always sorted in a BST._

**cs-12-056** · CS-12.3 · M  
Which statement correctly tells a general graph apart from a tree?  
A) A graph has no edges; a tree has edges  
B) A tree may contain cycles; a graph has none  
C) A graph must have a single root node  
**D) A graph may contain cycles; a tree has none ✓**  
_A tree is a connected graph with no cycles and one root; a general graph may have cycles and has no root. The reversed statement mixes the two up._

**cs-12-062** · CS-12.3 · M  
The values 1, 2, 3 are pushed, in that order, onto an empty stack and also enqueued, in that order, into an empty queue. Then one pop and one dequeue are done. Which values are removed?  
A) Pop gives 1, dequeue gives 3  
**B) Pop gives 3, dequeue gives 1 ✓**  
C) Pop gives 3, dequeue gives 3  
D) Pop gives 1, dequeue gives 1  
_The stack is LIFO, so pop removes the last value pushed, 3. The queue is FIFO, so dequeue removes the first value added, 1._

## cs-13 — Data Analytics (10 of 30)

**cs-13-001** · CS-13.1 · E  
What is the mean of 4, 8, 6, 10, 7?  
A) 6  
B) 8  
C) 35  
**D) 7 ✓**  
_Sum = 4 + 8 + 6 + 10 + 7 = 35, and 35 / 5 = 7. 35 is the sum before dividing by the number of values._

**cs-13-007** · CS-13.1 · M  
What is printed?
```
data = [4, 7, 7, 10, 12]
print(sum(data) / len(data))
```  
**A) 8.0 ✓**  
B) 8  
C) 7.0  
D) 40  
_sum(data) = 4 + 7 + 7 + 10 + 12 = 40 and len(data) = 5. In Python 3, `/` always gives a float, so 40 / 5 prints `8.0`, not `8`._

**cs-13-008** · CS-13.1 · D  
What is printed?
```
data = [9, 2, 7, 4, 6]
data.sort()
mid = len(data) // 2
print(data[mid])
```  
**A) 6 ✓**  
B) 7  
C) 4  
D) 5.6  
_After sorting, data = [2, 4, 6, 7, 9]; mid = 5 // 2 = 2, and data[2] = 6, the median. 7 is the item at index 2 before sorting; 5.6 is the mean (28 / 5)._

**⚠ cs-13-014** · CS-13.1 · M  
To test whether a revision app raises scores, one group of students uses the app and a similar group studies without it. The group without the app is the  
A) experimental group  
B) dependent group  
C) outlier group  
**D) control group ✓**  
_The control group does not get the treatment and is used for comparison. The group that uses the app is the experimental group._

**⚠ cs-13-015** · CS-13.1 · M  
A researcher changes the number of practice hours given to students and measures their test scores. The test score is the  
A) independent variable  
**B) dependent variable ✓**  
C) control group  
D) sample size  
_The variable the researcher changes (practice hours) is the independent variable; the one measured to see the effect (test score) is the dependent variable._

**cs-13-017** · CS-13.2 · M  
Which order of steps fits a typical data-science workflow?  
A) Clean data → collect data → visualise → analyse  
B) Visualise → collect data → clean data → analyse  
C) Analyse → clean data → collect data → share results  
**D) Collect data → clean data → analyse data → visualise and share results ✓**  
_Data must be collected before it can be cleaned, and cleaned before it is analysed; results are then shown and shared. Cleaning cannot come before there is data to clean._

**cs-13-018** · CS-13.2 · E  
Which of these is a data-cleaning step?  
A) Drawing a pie chart of the results  
**B) Removing duplicate rows and handling missing values ✓**  
C) Writing the null hypothesis  
D) Presenting findings to the manager  
_Cleaning prepares raw data for analysis: removing duplicates, filling or removing missing values and correcting errors. Charts and presentations come later, in visualisation and communication._

**cs-13-027** · CS-13.3 · M  
A test gives p = 0.12 with α = 0.05. What is the correct decision?  
A) Reject H₀ and accept H₁  
B) Reject both H₀ and H₁  
**C) Do not reject H₀ (there is not enough evidence against it) ✓**  
D) Raise α to 0.15 so that H₀ can be rejected  
_0.12 is not less than 0.05, so H₀ is not rejected. α is fixed before the test; raising it afterwards to get a rejection is not allowed._

**cs-13-029** · CS-13.3 · M  
In hypothesis testing, the significance level α (for example 0.05) is  
A) the probability that H₁ is true  
**B) the cut-off chosen before the test: reject H₀ when the p-value is below it ✓**  
C) the average of the sample data  
D) the number of observations in the sample  
_α is the threshold set in advance; the p-value from the data is compared with it. It is not the chance that H₁ is true._

**⚠ cs-13-030** · CS-13.3 · D  
A company claims its phone's battery lasts more than 10 hours on average. A researcher tests this claim. Which pair of hypotheses fits?  
A) H₀: mean battery life > 10 hours; H₁: mean battery life = 10 hours  
B) H₀: mean battery life < 10 hours; H₁: mean battery life > 10 hours  
**C) H₀: mean battery life = 10 hours; H₁: mean battery life > 10 hours ✓**  
D) H₀: mean battery life ≠ 10 hours; H₁: mean battery life = 10 hours  
_The claim to be supported ('more than 10') is H₁, and H₀ is the no-effect value, 10 hours. Putting the claim in H₀ reverses the roles; H₀ must contain the equality._

## cs-14 — Digital Literacy and Entrepreneurship (10 of 20)

**cs-14-001** · CS-14.1 · E  
Which Boolean operator narrows a search so that results must contain both search terms?  
A) OR  
B) NOT  
**C) AND ✓**  
D) NEAR  
_AND returns only pages that contain every joined term, so it gives fewer, more focused results. OR widens a search by accepting pages with either term._

**cs-14-002** · CS-14.1 · M  
Which query returns pages that mention at least one of the two words solar and wind?  
A) `solar AND wind`  
**B) `solar OR wind` ✓**  
C) `solar NOT wind`  
D) `"solar wind"`  
_OR accepts a page that contains either word or both. AND needs both words, NOT drops pages that mention wind, and the quotation marks ask for the exact phrase "solar wind"._

**⚠ cs-14-007** · CS-14.1 · M  
When evaluating an online source, a student checks whether the writer is a qualified expert working for a known organisation. Which criterion is being checked?  
A) Currency  
**B) Authority ✓**  
C) Relevance  
D) Coverage  
_Authority is about who wrote the source and whether they are qualified to write it. Currency is about how recent the information is._

**cs-14-008** · CS-14.1 · M  
A student sends an online questionnaire to her classmates and collects their answers herself. The data she collects is:  
A) secondary data  
B) metadata  
C) a citation  
**D) primary data ✓**  
_Data collected first-hand by the researcher for her own study is primary data. Secondary data was collected by someone else, for example figures from a published report._

**⚠ cs-14-009** · CS-14.1 · D  
Four web pages contain these words: P1 "python" and "snake"; P2 "python" only; P3 "snake" only; P4 "python" and "code". Which pages match `python NOT snake`?  
A) P2 only  
B) P1, P2 and P4  
**C) P2 and P4 ✓**  
D) P3 only  
_The page must contain python and must not contain snake. P2 and P4 qualify; P1 mentions snake and P3 lacks python. Answering P2 only wrongly drops P4, which never mentions snake._

**cs-14-010** · CS-14.1 · M  
An email that looks like it is from your bank asks you to confirm your password by clicking a link. What is the safest response?  
A) Click the link, but enter the password only if the page shows the bank logo  
**B) Do not click; contact the bank through its official number or website ✓**  
C) Reply to the email asking the sender to confirm that it is really the bank  
D) Click the link from a computer that has an up-to-date antivirus program  
_This is a typical phishing message: a bank never asks for a password by email. Checking through the bank’s own official contact avoids the fake link; a copied logo, a reply that reaches the attacker, or antivirus software does not make the link safe._

**cs-14-014** · CS-14.2 · M  
A team quickly draws paper mock-ups of an app's screens so that users can try them. Which design thinking stage is this?  
**A) Prototype ✓**  
B) Empathize  
C) Define  
D) Ideate  
_Building a simple, cheap model of a solution is the Prototype stage. Ideate is generating ideas, before any model is built._

**⚠ cs-14-017** · CS-14.2 · D  
A small online tutoring business has fixed costs of Rs 60,000 a month. Each lesson sold earns Rs 300 more than its own cost. How many lessons a month must it sell to break even?  
A) 300  
B) 180  
**C) 200 ✓**  
D) 2000  
_Break-even is where the earnings per lesson cover the fixed costs: 60,000 ÷ 300 = 200 lessons. Below 200 lessons the business makes a loss._

**cs-14-018** · CS-14.2 · M  
In a business plan, the target market is:  
A) everyone who uses the internet  
B) the place where the business keeps its stock  
C) the total money the business expects to earn  
**D) the specific group of customers the business aims to sell to ✓**  
_A target market is a clearly defined group of likely customers, for example students in a city. Aiming at everyone online is too broad to plan for; expected earnings are a financial projection._

**cs-14-019** · CS-14.2 · M  
In a SWOT analysis, a large new competitor entering the market is listed as a:  
A) Weakness  
B) Strength  
C) Opportunity  
**D) Threat ✓**  
_Threats are outside factors that could harm the business, and a new competitor is outside the business. Weaknesses are internal, such as a small team or little money._

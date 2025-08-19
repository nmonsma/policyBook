To install:
npm install

To start app:
npm start

To preview:
http://localhost:3000

To run the app in Cpanel:
1. Create the application with the proper root location. Choose recommended node.js version; set epcspolicy as application URL. Set app.js as the startup file.
2. Run NPM Install.
3. Click "Start App"
4. Navigate to the Terminal, and run: source /home/nickjufg/nodevenv/nodejs/policyBook/14/bin/activate && cd /home/nickjufg/nodejs/policyBook
5. Run: npm start --scripts-prepend-node-path


To create policy manual:
1. Select appropriate manual from the drop-down list.
2. Unselect policy numbers, approval information, and hanbooks from Display Options.
3. Ctrl+A, then Ctrl+C to copy policy book.
4. Ctrl+V to paste into MS Word document.

Format Policy Headings:
5. Highlight and copy the special character at the end of each policy paragraph heading (represented by a small circle).
6. Find and Replace
7. Paste that character in the "Find what" box.
8. While the cursor is in the "Find what" box, select Format->Font->Bold.
9. Place the cursor in the "Replace with" box, select Format->Style->Heading 4
10. Click "Replace All"
11. Click "No Formatting" while in each of the "Find what" and "Replace with" boxes.
12. Click "Replace All" to remove all the special characters.


Format Section Headings
13. Find and Replace
14. While the cursor is in the "Find What" box, select Format->Font->Bold.
15. While the cursor is in the "Find What" box, select Format->Style->Normal.
16. Place the cursor in the "Replace with" box; select Format->Style->Heading 3.
17. Replace All.

18. Find your major headings, and change the styles to Heading 2.

Replace line breaks with paragraphs.

Now, choose formatting for your styles, and print!

List Paragraphs:
1. Create a List Paragraph style with proper indents.
2. Find and Replace: "^p- " with "^p-| " to isolate bulleted list items.
3. Find and Replace using wildcards: "([^013][0-9]@. )" with "\1|" to isolate numbered list items.
3. Find and Replace: "|" with blank and List Paragraph Style.
3. Find and Replace "|" with blank and no formatting to remove pipes. 

Resize images so they fit on the page.

// import fs from 'node:fs';
// import fs from 'node:fs/promises';
// import path from 'node:path';

// const message = "Hello World!";

// console.log(message)

// const content = fs.readFileSync('test.txt');
// const contentt = fs.readFileSync('test2.json');
// const entry = JSON.parse(contentt.toString());

// fs.writeFileSync('output.txt', content);

// console.log(content.toString());
// console.log(entry);
// console.log(entry.message);

// const content = fs.readFile('test.txt');
// const content = fs.readFile('test2.json', (err, content) => {
//   fs.writeFile('output.txt', content, (err) => {
//     console.log('write');
//   });
//   console.log('read');
// });

// console.log('finish');

// try {
// //   const content = await fs.rename('qwe.txt', 'test.txt');
// //   await fs.unlink('output.txt', content);

//   const entry = JSON.parse(content.toString());
//   console.log(entry.message);
// } catch (error) {
//   console.log(error);
// }

// console.log(path.join('dir/qwe/../text.json'));

//!==========================
//! 1
// const content = fs.readFileSync('test.txt');

// fs.writeFileSync('output.txt', content)
// console.log(content)
// console.log(content.toString());

//!==========================
//! 2

// const content = fs.readFile('test.txt', (err, content) => {
//   fs.writeFile('output.txt', content, (err) => {
//     console.log('done');
//   });
// });

// console.log(content);

//!==========================
//! 3
// import fs from 'node:fs/promises';

// const content = await fs.readFile('test.txt');

// await fs.writeFile('output.txt', content);
// console.log(content);
// console.log(content.toString());

//!==========================

const dns = require("dns");
const { exec } = require("child_process");


dns.lookup("dummyjson.com", (err, address, family) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`IP Address: ${address}, IPv${family}`);
  }
});


exec("traceroute dummyjson.com", (err, stdout, stderr) => {
  if (err) {
    console.error("Traceroute error:", err.message);
  } else {
    console.log(stdout);
  }
});

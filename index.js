//base by DGXeon
//recode by rapikz

const {
   spawn
} = require('child_process')
const path = require('path')

function start() {
   let args = [path.join(__dirname, 'main.js'), ...process.argv.slice(2)]
   console.log([process.argv[0], ...args].join('\n'))
   let p = spawn(process.argv[0], args, {
         stdio: ['inherit', 'inherit', 'inherit', 'ipc']
      })
      .on('message', data => {
         if (data == 'reset') {
            console.log('Restarting Bot...')
            p.kill()
            start()
            delete p
         }
      })
      .on('exit', code => {
         console.error('Exited with code:', code)
         if (code == '.' || code == 1 || code == 0) start()
      })
}
start()
let nodeRestartCount = 0;
const maxNodeRestart = 5;
let lastRestartTime = Date.now();

// Function to handle node restart logic
const handleNodeRestart = () => {
  const currentTime = Date.now();
  
  // Check if the restart count exceeds the allowed limit within the allowed time window
  if (currentTime - lastRestartTime < 3600000) { // 1 hour in milliseconds
    if (nodeRestartCount >= maxNodeRestart) {
      console.log('Max restart limit reached. Please check the system.');
      return;
    }
  } else {
    // Reset the counter if the time window has passed (more than an hour)
    nodeRestartCount = 0;
    lastRestartTime = currentTime;
  }
  
  // Restart logic (you can add your actual node restart mechanism here)
  console.log('Restarting node...');
  
  // Increment the restart count and update the last restart time
  nodeRestartCount++;
  lastRestartTime = currentTime;

  // Simulate a restart process (e.g., calling a function to restart your application)
  setTimeout(() => {
    console.log('Node has been restarted successfully.');
    // Perform actual node restart logic here
  }, 2000); // Simulating a 2-second delay before a successful restart
};

// Example trigger to restart the node
handleNodeRestart(); // This will attempt to restart the node and check the restart count

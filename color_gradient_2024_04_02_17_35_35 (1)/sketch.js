let video;
let colors = [];
let currentColor, nextColor;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Define colors from the palette
  colors.push(color('#004921')); // Green
  colors.push(color('#FBBD22')); // Yellow
  colors.push(color('#F88D22')); // Orange
  
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();
}

function draw() {
  background(255);

  // Use millis() to get the elapsed time in milliseconds and divide by 5000 to scale for 5-second cycles
  let gridSize = int(map(abs(sin(millis() / 5000)), 0, 1, 5, 20));

  video.loadPixels();
  for (let y = 0; y < video.height; y += gridSize) {
    for (let x = 0; x < video.width; x += gridSize) {
      
      let index = (y * video.width + x) * 4;
      let r = video.pixels[index];
      let dia = map(r, 0, 255, gridSize, 2);
      
      // Calculate color based on time
      let colorIndex = floor(millis() / 5000) % colors.length;
      let nextColorIndex = (colorIndex + 1) % colors.length;
      let lerpFactor = (millis() % 5000) / 5000; // This will oscillate between 0 and 1 over 5 seconds
      let col = lerpColor(colors[colorIndex], colors[nextColorIndex], lerpFactor);
      
      fill(col);
      noStroke();
      circle(x, y, dia);
    } 
  }
}

// A really nice techno-looking color scheme
let defaultColorScheme = "003049,FDFDFD,F7941D"

// get the color scheme from the URL query string ( EX ?theme=003049,FDFDFD,F7941D)
const theme = new URLSearchParams(window.location.search).get("theme") || defaultColorScheme
const colorScheme = parseColorScheme(theme);

// set page background color to match color scheme
document.body.style.backgroundColor = colorScheme.background;

const particles = Particles.init({
    selector: '.background',
    maxParticles: 200,
    sizeVariations: 5,
    speed: 0.4,
    color: colorScheme.colors,
    minDistance: 120,
    connectParticles: true,
});

// Check if the query string contains a '?png' parameter
if (window.location.search.includes('?png')) {
    openPng()
}

function openPng() {
    particles.pauseAnimation();

    const pageWidth = document.body.clientWidth;
    const pageHeight = document.body.clientHeight;
    const container = document.body
    html2canvas(container).then(canvas => {
        // To get better quality, we'll increase the size of the canvas
        const canvasWidth = pageWidth * 10;
        const canvasHeight = pageHeight * 10;

        const a = document.createElement('a');
        a.href = canvas.toDataURL('image/png');
        a.download = 'particles.png';
        a.click();
    })

    particles.resumeAnimation();
}

function parseColorScheme(str) {
    console.log(str)
    const colors = str.split(',').map(a => "#" + a).map(a => a.replace("##", "#"));
    return {
        background: colors[0],
        colors: colors.slice(1),
    }
}
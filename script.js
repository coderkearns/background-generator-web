// A really nice techno-looking color scheme
const colorScheme = parseColorScheme(`
// techno blue
003049
// white
FDFDFD
// techno orange
F7941D
`)

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
    /* parseColorScheme:
    takes a string like: "
    D62828
    003049
    003049
    "
    and returns an object like:
    {
        background: '#D62828',
        colors: ['#D62828', '#003049']
    }

    it ignores comments and empty lines
    */
    const lines = str.split('\n').filter(line => line.trim() !== '' && !line.startsWith('//')).map(line => ("#" + line.trim()).replace("##", "#"));
    return {
        background: lines[0],
        colors: lines.slice(1)
    }
}
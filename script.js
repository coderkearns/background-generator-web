// A really nice techno-looking color scheme
let defaultColorScheme = "003049,FDFDFD,F7941D"

// create an object from the query string (ex: ?theme=dark&speed=0.2 => {theme:"dark", speed:0.2})
const query = document.location.search
    .replace(/(^\?)/, '')
    .split("&")
    .map(function (n) {
        return n = n.split("="), this[n[0]] = n[1], this
    }.bind({}))[0];



// get the color scheme from the URL query string ( EX ?theme=003049,FDFDFD,F7941D)
const theme = query.theme || defaultColorScheme;
const colorScheme = parseColorScheme(theme);

// set page background color to match color scheme
document.body.style.backgroundColor = colorScheme.background;

const particles = Particles.init({
    selector: '.background',
    maxParticles: parseInt(query.maxParticles || 200),
    sizeVariations: parseInt(query.sizeVariations || 5),
    speed: parseFloat(query.speed || 0.4),
    color: colorScheme.colors,
    minDistance: parseInt(query.minDistance || 120),
    connectParticles: !!(query.connectParticles || true),
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
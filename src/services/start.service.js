function GetHtml(req, res){
    res.sendFile('index.html', { root: "./src/html" } );
}

function GetCss(req, res){
    res.sendFile('styles.428b33c116ec3804eee7.css', { root: "./src/html" } );
}

function GetFavicon(req, res){
    res.sendFile('favicon.ico', { root: "./src/html" } );
}

function GetMain(req, res){
    res.sendFile('main.ed4bd299c6d5d3ef0f0e.js', { root: "./src/html" } );
}

function GetPolyfills(req, res){
    res.sendFile('polyfills.bb5375064c51ff42a92f.js', { root: "./src/html" } );
}

function GetRuntime(req, res){
    res.sendFile('runtime.ec2944dd8b20ec099bf3.js', { root: "./src/html" } );
}

function GetWheel(req, res){
    res.sendFile('vwheel.png', { root: "./src/html/assets/images" } );
}


module.exports ={
    GetHtml:GetHtml,
    GetCss:GetCss,
    GetFavicon:GetFavicon,
    GetMain:GetMain,
    GetPolyfills:GetPolyfills,
    GetRuntime:GetRuntime,
    GetWheel:GetWheel
};
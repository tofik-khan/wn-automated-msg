exports.main = (args) => {
    let name = args.name || process.env.name || "TEST";
    let greeting = 'Hello ' + name + '!'
    console.log(greeting)
    return {"body": greeting}
}

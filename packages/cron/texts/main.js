function main(args) {
    let name = args.name || process.env.name || 'stranger'
    let greeting = 'Hello ' + name + '!'
    console.log(greeting)
    return {"body": greeting}
}

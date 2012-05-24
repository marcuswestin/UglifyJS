module.exports = function(ast) {
        check(ast, {})
}

function check(closure, ast) {
        console.log(ast[0])
        switch(ast[0]) {
                case 'toplevel':
                        return each(ast[1], check, closure)

                case 'defun':
                        return checkDefun(closure, ast)
        }
}

function checkDefun(closure, ast) {
        var name = ast[1]
        var args = ast[2]
        declare(closure, name, 'Function')
}

function each(arr, fn, closure) {
        arr.forEach(function(item) { fn(closure, item) })
}

function declare(closure, name, type) {
        if (closure.hasOwnProperty(name)) { fail('Repeat declaration') }
        closure[name] = type
}

function fail(name) {
        throw { name:name }
}

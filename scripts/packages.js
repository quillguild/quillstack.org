// The one list of what this framework is made of. Everything else on the site — the sidebar,
// the package index, the pages themselves — is built from it, so a package is added here and
// nowhere else.
export const GROUPS = [
    {
        id: 'start',
        title: 'Start here',
        blurb: 'The framework itself, and the skeleton to start an application from.',
        packages: [
            ['framework', 'The framework', 'Wires the parts together: the kernel, middleware, error handling and the console.'],
            ['quillstack', 'The skeleton', 'A working application to start from, with routes, a controller and tests already in place.'],
        ],
    },
    {
        id: 'http',
        title: 'HTTP',
        blurb: 'Everything a request touches on its way in, and a response on its way out. PSR-7, PSR-15, PSR-17 and PSR-18 throughout.',
        packages: [
            ['router', 'Router', 'Matches a request to a controller, and says what a path answers to when it does not.'],
            ['middleware', 'Middleware', 'The PSR-15 stack a request passes through.'],
            ['server-request', 'Server request', 'The request as it arrived, built from the globals.'],
            ['http-request', 'HTTP request', 'The methods, and what each of them means.'],
            ['response', 'Response', 'What goes back, and the status codes that go with it.'],
            ['http-client', 'HTTP client', 'Sending a request somewhere else, over cURL.'],
            ['uri', 'URI', 'Taking a URI apart and putting it back together.'],
            ['stream', 'Stream', 'The body of a message, read a piece at a time.'],
            ['header-bag', 'Header bag', 'Headers, matched without regard for case.'],
            ['auth', 'Authentication', 'Who is asking, enforced by the route rather than remembered by the controller.'],
        ],
    },
    {
        id: 'data',
        title: 'Data',
        blurb: 'Getting things out of a database and back into one.',
        packages: [
            ['orm', 'ORM', 'Entities, relations, and a batching strategy that makes N+1 queries impossible.'],
            ['db', 'Database', 'The connection underneath, over PDO.'],
        ],
    },
    {
        id: 'foundation',
        title: 'Foundation',
        blurb: 'The parts an application stands on, each usable on its own.',
        packages: [
            ['di', 'Container', 'PSR-11, built for speed: dependencies read once and remembered.'],
            ['config', 'Config', 'Settings, and where they are read from.'],
            ['dotenv', 'Dotenv', 'The environment file, parsed strictly.'],
            ['dotenv-expand', 'Dotenv expand', 'Values built from other values, where an unknown name is an error rather than an empty string.'],
            ['events', 'Events', 'PSR-14 dispatching.'],
            ['cache', 'Cache', 'PSR-16, in an array or on disk.'],
            ['logger', 'Logger', 'PSR-3, with the message and its context kept apart.'],
            ['serializer', 'Serializer', 'What goes over the wire, said as what may rather than what may not.'],
            ['queue', 'Queue', 'Work handed to somebody else to do later.'],
            ['clock', 'Clock', 'PSR-20, so a test can say what time it is.'],
            ['datetime', 'Date and time', 'Dates that behave.'],
            ['parameter-bag', 'Parameter bag', 'A bag of values, asked politely.'],
            ['local-storage', 'Local storage', 'Files on this machine.'],
            ['storage-interface', 'Storage interface', 'What any storage has to answer to.'],
            ['validator-interface', 'Validator interface', 'What any validator has to answer to.'],
            ['output', 'Output', 'Writing to the terminal.'],
            ['cli', 'CLI', 'Commands, arguments and the console that runs them.'],
        ],
    },
    {
        id: 'testing',
        title: 'Testing',
        blurb: 'The tools this framework is tested with, which are also the ones it ships.',
        packages: [
            ['unit-tests', 'Unit tests', 'A test runner with no configuration to write.'],
            ['test-coverage', 'Test coverage', 'What the tests reached, and what they did not.'],
            ['benchmark', 'Benchmark', 'How long things take, measured rather than guessed.'],
            ['standards', 'Standards', 'Checks a package against the shape every Quillstack package takes.'],
        ],
    },
];

export const ALL = GROUPS.flatMap((group) =>
    group.packages.map(([name, title, blurb]) => ({ name, title, blurb, group: group.id }))
);

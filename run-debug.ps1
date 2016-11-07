$Path = './reporter-test'
$Command = 'npm run debug'
Start-Process 'powershell' -ArgumentList @($Command) -WorkingDirectory $Path -Wait -NoNewWindow

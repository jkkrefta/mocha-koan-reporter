$SourcePath = './reporter'
$TestPath = './reporter-test'
$Line = '=============================='

function RunPSProcess ($Command, $Path)
  {
    Start-Process 'powershell' -ArgumentList @($Command) -WorkingDirectory $Path -Wait -NoNewWindow
  }

function TryRemove ($Path)
  {
    "Verifying path: $Path"
    $PathIsValid = Test-Path $Path
    If ($PathIsValid)
    {
      "Given path is not empty"
      remove-item $Path -Force -Recurse
      "Deleted $Path"
    }
  }

function Cleanup
  {
    "Performing cleanup"
    $Line
    TryRemove -Path ./reporter/mocha-koan-reporter*.tgz
    TryRemove -Path ./reporter-test/node_modules/mocha-koan-reporter
    $Line
  }

function BuildReporter
  {
    "Building reporter"
    $Line
    RunPSProcess -Command 'npm run build' -Path $SourcePath
    RunPSProcess -Command 'npm pack' -Path $SourcePath
    $Line
  }

function BuildTest
  {
    "Building test environment"
    $Line
    RunPSProcess -Command 'npm install' -Path $TestPath
    $Line
  }

function RunTest
  {
    "Running test"
    $Line
    RunPSProcess -Command 'npm run test' -Path $TestPath
    $Line
  }

$Line
Cleanup
BuildReporter
BuildTest
RunTest

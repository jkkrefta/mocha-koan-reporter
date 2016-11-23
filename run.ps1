param (
  [switch]$debug = $false
)

$SourcePath = './reporter'
$TestPath = './reporter-test'

import-module ./scripts/tasks.psm1

PrintLine
CleanupReporter -Path $SourcePath
CleanupTestHarness -Path $TestPath
BuildReporter -Path $SourcePath
BuildTestHarness -Path $TestPath
if ($debug) {
  RunDebug -Path $TestPath
}
else {
  RunTests -Path $TestPath
}

require 'fileutils'
include FileUtils

ROOT = __dir__.freeze
BIN = "#{ROOT}/node_modules/.bin".freeze

def cmd_exists?(cmd)
  File.exists?(cmd) && File.executable?(cmd)
end

def ensure_cmd(cmd)
  $cmd_cache ||= []
  return true if $cmd_cache.include? cmd

  paths = ENV['PATH'].split(':').uniq
  unless paths.any?{|p| cmd_exists? "#{p}/#{cmd}" }
    raise "'#{cmd}' command doesn't exist"
  else
    $cmd_cache << cmd
  end
end

file 'node_modules' do
  ensure_cmd 'npm'
  sh 'npm install'
end

file "typings" do
  ensure_cmd 'tsd'
  sh 'tsd install'
end

task :dep => %i(node_modules typings)

task :build_browser_src => %i(typings) do
  sh "#{BIN}/tsc -p #{ROOT}/browser"
end

task :build_renderer_src do
  mkdir_p 'build/renderer'
  sh "#{BIN}/tsc -p #{ROOT}/renderer"
  sh "#{BIN}/browserify -d -o #{ROOT}/build/renderer/index.js #{ROOT}/renderer/out/index.js"
end

task :build_cli_src do
  sh "#{BIN}/tsc -p #{ROOT}/cli"
end

task :build => %i(dep build_browser_src build_renderer_src build_cli_src)

task :run do
  sh "node #{ROOT}/build/cli/main.js"
end

task :debug do
  sh "NODE_DEBUG=rocket node #{ROOT}/build/cli/main.js"
end

task :default => %i(build run)

task :asar => %i(build) do
  mkdir_p 'archive'
  begin
    %w(package.json index.html style build).each{|p| cp_r p, 'archive/' }
    cd 'archive' do
      sh 'npm install --production'
    end
    sh "#{BIN}/asar pack archive app.asar"
  ensure
    rm_rf 'archive'
  end
end

task :lint do
  sh "tslint #{Dir['./**/*.ts'].join(' ')}"
end

task :test do
  puts "Not available now :("
end

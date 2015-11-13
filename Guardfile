ignore /^node_modules/, /^build/, /^typings/

def build(kind, path)
  puts "\033[93m#{Time.now}: #{File.basename path}\033[0m"
  success = system "rake build_#{kind}_src"
  if success
    puts "\033[92mOK\033[0m"
  else
    puts "\033[91mFAIL\033[0m"
  end
end

guard :shell do
  watch %r[^browser/.+\.ts$] do |m|
    build('browser', m[0])
  end
  watch %r[^renderer/.+\.tsx?$] do |m|
    build('renderer', m[0])
  end

  watch %r[^cli/.+\.ts$] do |m|
    build('cli', m[0])
  end
end

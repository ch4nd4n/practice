# https://www.rubyguides.com/2015/07/ruby-threads/

require 'net/http'

def get(url)
  uri = URI(url)
  response = Net::HTTP.get_response(uri)
  puts response.body
end


threads = []

threads << Thread.new {
    get('https://jsonplaceholder.typicode.com/todos/1')
}

threads << Thread.new {
    get('https://jsonplaceholder.typicode.com/posts/2')
}

threads << Thread.new {
    get('https://jsonplaceholder.typicode.com/posts/3')
}

threads.each(&:join)

puts "All good"
#!/usr/bin/env ruby
require_relative "lib/data_sorter"

output_file = "time-by-project.js"

data_sorter =  DataSorter.new("../data/alldata.csv", date_range: Date.parse("2012-03-03")..Date.parse("2012-06-01"))
data_structure = data_sorter.data_structure
File.open(output_file, "w") do |io|
  io << "var json =" << JSON.dump(data_structure)
end

puts "Wrote sorted data to #{output_file}"

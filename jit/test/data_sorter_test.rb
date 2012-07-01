require 'minitest/unit'
require 'minitest/autorun'
require_relative '../lib/data_sorter'

class DataSorterTest < MiniTest::Unit::TestCase

	def test_projects_with_tasks_from_csv_groups_tasks_by_product
    sorter = DataSorter.new(File.dirname(__FILE__) + "/fixtures/sample.csv")

    projects_with_tasks = sorter.projects_with_tasks_from_csv
    product_a = projects_with_tasks.select { |p| p.id == "A" }.first
    assert_equal 1, product_a.tasks.size
    first_task = product_a.tasks.first
    assert_equal "A-129", first_task.id
    assert_equal "10/03/2011", first_task.start_date
    assert_equal "01/04/2011", first_task.end_date
    assert_equal 22, first_task.time_spent_in_days
  end

  def test_data_structure_returns_a_hash_with_primitive_data_types
    sorter = DataSorter.new(File.dirname(__FILE__) + "/fixtures/sample.csv")
    actual = sorter.data_structure
    product_a = actual['children'].select { |product| product["id"] == "A" }.first
    task = product_a["children"].first
    assert_instance_of Fixnum, task["data"]["$angularWidth"]
    assert_instance_of Fixnum, task["data"]["timeTaken"]
  end

  def test_can_produce_data_structure_filtered_by_date_range
    date_range_including_task = Date.parse("10/3/2011")..Date.parse("10/3/2011")
    data = DataSorter.new(File.dirname(__FILE__) + "/fixtures/sample2.csv", date_range: date_range_including_task ).data_structure
    product_a = data['children'].select { |product| product["id"] == "A" }.first
    assert_equal 1, product_a["children"].size

    date_range_excluding_task = Date.parse("9/3/2011")..Date.parse("9/3/2011")
    data = DataSorter.new(File.dirname(__FILE__) + "/fixtures/sample2.csv", date_range: date_range_excluding_task ).data_structure
    product_a = data['children'].select { |product| product["id"] == "A" }.first
    assert_equal 0, product_a["children"].size
  end

  def test_a_task_is_in_range_if_start_date_is_in_range
    date_range = Date.parse("2012-01-01")..Date.parse("2012-01-01")
    assert DataSorter::Task.new("1", "2012-01-01", "2012-02-01").in_range?(date_range)
  end

  def test_a_task_is_in_range_if_end_date_is_in_range
    date_range = Date.parse("2012-02-01")..Date.parse("2012-02-01")
    assert DataSorter::Task.new("1", "2012-01-01", "2012-02-01").in_range?(date_range)
  end

  def test_a_task_is_in_range_if_range_is_contained_between_start_date_and_end_date
    date_range = Date.parse("2012-01-10")..Date.parse("2012-01-20")
    assert DataSorter::Task.new("1", "2012-01-01", "2012-02-01").in_range?(date_range)
  end
end
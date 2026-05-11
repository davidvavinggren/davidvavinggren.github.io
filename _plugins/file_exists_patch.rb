# File.exists? was removed in Ruby 3.0; patch it back for jekyll-scholar 5.x
class File
  class << self
    alias_method :exists?, :exist? unless respond_to?(:exists?)
  end
end

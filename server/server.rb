#
# Instal Ruby
# Instal
# gem install aws-sdk-s3
# gem install sinatra
# ruby server.rb (to run)
# default port is 4567
# POST localhost:4567/upload
# Payload json:
# {
#  "filename": "nazwa pliku",
#  "data": "zawartosc pliku"
#}
# uzupełnij dane w funkcji RUN ME
# piszcie z pytaniami :)

require 'aws-sdk-s3'

require 'rubygems'
require 'sinatra'

def object_uploaded?(s3_client, bucket_name, object_key, filename)
  response = s3_client.put_object(
    bucket: bucket_name,
    key: object_key,
    body: File.open(filename).read()
  )
  if response.etag
    return true
  else
    return false
  end
rescue StandardError => e
  puts "Error uploading object: #{e.message}"
  return false
end

# Full example call:
def run_me(file_in)
  bucket_name = 'NAZWA BUCTKETA KTÓRY UTWORZYSZ'
  object_key = file_in
  endpoint = 'https://gateway.storjshare.io'
  accesskey = 'ACCESS KEY ID'
  key = 'SECREET ACCESS KEY ID'
  region = 'us-east-1'
  s3_client = Aws::S3:: Client.new(region: region, access_key_id: accesskey, secret_access_key: key, endpoint: endpoint)

  if object_uploaded?(s3_client, bucket_name, object_key, object_key)
    puts "Object '#{object_key}' uploaded to bucket '#{bucket_name}'."
  else
    puts "Object '#{object_key}' not uploaded to bucket '#{bucket_name}'."
  end
end


post "/upload" do
  push = JSON.parse(request.body.read)
  File.open(push["filename"], "w") do |f|
   f.write(push["data"])
  end
  run_me(push["filename"].to_s)
  return "The file was successfully uploaded!"
end



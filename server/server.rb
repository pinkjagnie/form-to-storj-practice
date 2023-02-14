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

require 'dotenv/load'

ACCESS_KEY_ID = ENV['ACCESS_KEY_ID']
SECREET_ACCESS_KEY_ID = ENV['SECREET_ACCESS_KEY_ID']
puts ACCESS_KEY_ID

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

def object_downloaded?(s3_client, bucket_name, object_key)
  response = s3_client.get_object(
    bucket: bucket_name,
    key: object_key
  )
  if response.etag
    data = response.body.read
    puts "Data: #{data}"
    file = File.write("object_key", data)
    return true
  else
    return false
  end
rescue StandardError => e
  puts "Error uploading object: #{e.message}"
  return false
end

# Full example call:
def run_me(file_in, mode)
  bucket_name = 'files-form-demo-bucket'
  object_key = file_in
  endpoint = 'https://gateway.storjshare.io'
  accesskey = ACCESS_KEY_ID
  key = SECREET_ACCESS_KEY_ID
  region = 'us-east-1'
  s3_client = Aws::S3:: Client.new(region: region, access_key_id: accesskey, secret_access_key: key, endpoint: endpoint)
  if mode=="download"
    object_downloaded?(s3_client, bucket_name, file_in)
    return
  end
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


post "/upload2" do
  @filename = params[:file][:filename]
  file = params[:file][:tempfile]
  File.open("./#{@filename}", 'wb') do |f|
    f.write(file.read)
  end
  run_me(@filename, "upload")
  return 200, @filename
end

get "/get/:key" do
  run_me(params[:key], "download")
  send_file params[:key]
end
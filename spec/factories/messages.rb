FactoryGirl.define do
  factory :message do
    content Faker::Lorem.sentence
    image File.open('spec/fixtures/Apple.jpg')
    user
    group
  end
end

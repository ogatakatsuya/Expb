#include <WiFi.h>
#include <ESP32Firebase.h>
#include <DHT.h>

#define DHT_MODEL DHT11
#define DHT_PIN 14  

#define _SSID "かっちゃん"
#define _PASSWORD "shirimasen"
#define REFERENCE_URL "https://expb-4e9bc-default-rtdb.asia-southeast1.firebasedatabase.app/"

Firebase firebase(REFERENCE_URL);
DHT dht(DHT_PIN, DHT_MODEL); 

void setup() {
  Serial.begin(9600);
  dht.begin();
  WiFi.mode(WIFI_STA);
  WiFi.disconnect();
  delay(1000);

  Serial.println();
  Serial.println();
  Serial.print("Connecting to: ");
  Serial.println(_SSID);
  WiFi.begin(_SSID, _PASSWORD);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print("-");
  }

  Serial.println("");
  Serial.println("WiFi Connected");

  Serial.print("IP Address: ");
  Serial.print("http://");
  Serial.print(WiFi.localIP());
  Serial.println("/");
}

void loop() {
  // 
  delay(1000);

  float Humidity = dht.readHumidity();
  float Temperature = dht.readTemperature();
}
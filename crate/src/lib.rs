#[macro_use]
extern crate cfg_if;
extern crate chrono;
extern crate js_sys;
extern crate wasm_bindgen;
extern crate web_sys;

use chrono::NaiveDateTime;
use js_sys::*;
use std::str;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn parse2(source: String) -> JsString {
    let content_lines = source.split("\r\n");
    let mut location = "unknown";
    let mut date_raw = "unknown";

    for line in content_lines {
        if line == "" {
            continue;
        }
        let line_split: Vec<&str> = line.split(':').collect();
        let name = line_split[0];

        match name {
            "LOCATION" => {
                location = line_split[1].clone();
            }
            "DTSTAMP" => {
                date_raw = line_split[1].clone();
            }
            _ => {}
        }
    }

    let date =
        NaiveDateTime::parse_from_str(date_raw, "%Y%m%dT%H%M%SZ").expect("could not parse date");

    JsString::from(format!("Starts at {} in {}.", date, location))
}

jest.unmock("../../step_tiles/index");
import * as React from "react";
import { InputDefault } from "../input_default";
import { mount } from "enzyme";
import { TaggedSequence } from "../../../resources/tagged_resources";
import { MoveAbsolute } from "farmbot/dist";
import { Wrapper } from "../../../__test_support__/wrapper";

describe("<InputDefault/>", () => {
  it("updates the step", () => {
    let dispatcher = jest.fn();
    let step: MoveAbsolute = {
      "kind": "move_absolute",
      "args": {
        "location": {
          "kind": "coordinate",
          "args": {
            "x": 0,
            "y": 0,
            "z": 0
          }
        },
        "offset": {
          "kind": "coordinate",
          "args": {
            "x": 0,
            "y": 0,
            "z": 0
          }
        },
        "speed": 800
      }
    };

    let tr: TaggedSequence = {
      "specialStatus": undefined,
      "kind": "sequences",
      "body": {
        "id": 74,
        "name": "Goto 0, 0, 0",
        "color": "gray",
        "body": [step],
        "args": {
          "version": 4
        },
        "kind": "sequence"
      },
      "uuid": "sequences.74.145"
    };
    let c = mount(<Wrapper>
      <InputDefault
        index={0}
        field="speed"
        step={step}
        dispatch={dispatcher}
        sequence={tr} />
    </Wrapper>);
    let input = c.find("input").first();
    input.simulate("change");
    input.simulate("blur");
    expect(dispatcher.mock.calls.length).toEqual(1);
    let action = dispatcher.mock.calls[0][0];
    let { payload } = action;
    expect(action.type).toEqual("OVERWRITE_RESOURCE");
    expect(payload.uuid).toContain("sequences");
    expect(payload.update.name).toEqual(tr.body.name);
  });
});

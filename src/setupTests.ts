// TODO find way to fix this warning:
// https://github.com/facebookincubator/create-react-app/issues/3199

import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

export default Enzyme